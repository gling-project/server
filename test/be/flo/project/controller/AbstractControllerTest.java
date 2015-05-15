package be.flo.project.controller;

import be.flo.project.controller.technical.security.CommonSecurityController;
import be.flo.project.dto.AccountDTO;
import be.flo.project.dto.post.LoginDTO;
import be.flo.project.dto.post.RegistrationDTO;
import be.flo.project.dto.technical.DTO;
import be.flo.project.dto.technical.ExceptionDTO;
import be.flo.project.model.entities.technical.AbstractEntity;
import be.flo.project.util.exception.MyRuntimeException;
import com.fasterxml.jackson.databind.JsonNode;
import org.junit.Before;
import org.junit.Test;
import play.Logger;
import play.db.jpa.JPA;
import play.libs.F;
import play.libs.Json;
import play.mvc.Result;
import play.test.FakeRequest;
import play.test.Helpers;

import javax.persistence.criteria.CriteriaBuilder;
import javax.persistence.criteria.CriteriaDelete;
import javax.persistence.criteria.Root;
import javax.persistence.metamodel.ManagedType;
import javax.persistence.metamodel.Type;
import javax.transaction.NotSupportedException;
import javax.transaction.SystemException;
import java.util.Iterator;
import java.util.Set;
import java.util.function.Function;
import java.util.function.Predicate;
import java.util.stream.Collectors;

import static org.junit.Assert.*;
import static play.test.Helpers.*;

/**
 * Created by florian on 19/04/15.
 */
public abstract class AbstractControllerTest {

    protected static final String FIRSTNAME = "firstname";
    protected static final String LASTNAME = "lastname";
    protected static final String EMAIL = "my@email.com";
    protected static final String PASSWORD = "password";
    protected boolean connected=false;


    @Before
    public void before(){
        Helpers.start(Helpers.fakeApplication());
//        try {
//            sleep(2000);
//        } catch (Exception e) {
//            // do nothing
//        }
    }

    protected void registration(){

        if(!connected) {

            //try load
            try {
                Result request = request(POST, "/login", new LoginDTO(EMAIL, PASSWORD));
            }catch (MyRuntimeException e){
                RegistrationDTO dto = new RegistrationDTO();
                dto.setFirstname(FIRSTNAME);
                dto.setLastname(LASTNAME);
                dto.setMale(true);
                dto.setEmail(EMAIL);
                dto.setPassword(PASSWORD);
                dto.setKeepSessionOpen(true);

                Result result = request(POST, "/registration", dto);

                assertEquals(printError(result), 200, status(result));
            }
        }

        connected=true;
    }


    @Test
    public void testZZZ_cleanData() throws Exception {
        try {
            running(fakeApplication(), new Runnable() {
                public void run() {
                    JPA.withTransaction(new F.Callback0() {
                        @Override
                        public void invoke() throws Throwable {

                            Set<Class<?>> entityTypes = JPA.em().getMetamodel().getManagedTypes().stream()
                                    .filter(new Predicate<ManagedType<?>>() {
                                        @Override
                                        public boolean test(ManagedType<?> managedType) {
                                            return Type.PersistenceType.ENTITY.equals(managedType.getPersistenceType());
                                        }
                                    })
                                    .map(new Function<ManagedType<?>, Class<?>>() {
                                        @Override
                                        public Class<?> apply(ManagedType<?> managedType) {
                                            return managedType.getJavaType();
                                        }
                                    }).collect(Collectors.toSet());

                            Logger.info("Cleaning test data (found " + entityTypes.size() + " managed entity types)...");
                            deleteAllTestEntities(entityTypes, 1);

                        }
                    });
                }
            });
        }catch (Exception e){

        }
    }

    protected static final int CLEAN_TEST_DATA_MAX_TRIES_LIMIT = 10;

    protected void deleteAllTestEntities(Set<Class<?>> entityTypes, int triesCounter) throws NotSupportedException, SystemException {
        boolean success = true;
        for (Iterator<Class<?>> iterator = entityTypes.iterator(); iterator.hasNext(); ) {
            Class<?> entityType = iterator.next();
            if (AbstractEntity.class.isAssignableFrom(entityType)) {
                @SuppressWarnings("unchecked")
                Class<? extends AbstractEntity> abstractVOEntityType = (Class<? extends AbstractEntity>) entityType;
                boolean res = deleteTestEntities(abstractVOEntityType);
                if (res) {
                    iterator.remove();
                } else {
                    success = false;
                }
            }
        }

        if (success) {
            Logger.info("Succeed to clean all test data (after " + triesCounter + " trie(s))");
        } else {
            if (triesCounter == CLEAN_TEST_DATA_MAX_TRIES_LIMIT) {
                Logger.error("Failed to clean all test data after " + CLEAN_TEST_DATA_MAX_TRIES_LIMIT + " tries: db still contains test data of type(s): " + entityTypes);
            } else {
                Logger.info("Failed to clean all test data => retrying... (current tries number = " + triesCounter + ")");
                deleteAllTestEntities(entityTypes, ++triesCounter);
            }
        }
    }

    private <T extends AbstractEntity> boolean deleteTestEntities(Class<T> entityType) throws NotSupportedException, SystemException {
        boolean success = true;
        try {
            JPA.em().getTransaction().begin();
            JPA.em().joinTransaction();

            CriteriaBuilder cb = JPA.em().getCriteriaBuilder();
            CriteriaDelete<T> criteriaDelete = cb.createCriteriaDelete(entityType);
            Root<T> from = criteriaDelete.from(entityType);
            criteriaDelete.where(cb.equal(
                    from.get("creationUser"),
                    AbstractEntity.TEST_USER
            ));
            int nbDeletedEntities = JPA.em().createQuery(criteriaDelete).executeUpdate();

            JPA.em().flush();
            JPA.em().getTransaction().commit();

            if (nbDeletedEntities > 0) {
//                logger.info("Deleted " + nbDeletedEntities + " " + entityType.getSimpleName() + " test records");
            }
        } catch (Exception e) {
//            e.printStackTrace();
            JPA.em().getTransaction().rollback();
            success = false;
        }
        return success;
    }

    public String printError(Result result){
        if (result instanceof ExceptionDTO) {
            ExceptionDTO exceptionDTO = getDTO(result, ExceptionDTO.class);
            return "Exception : " + exceptionDTO.toString();
        } else return "200";
    }

    public <T> T getDTO(Result result, Class<T> type){

        String content = new String(contentAsBytes(result));
        JsonNode jsonResponse = Json.parse(content);

        return Json.fromJson(jsonResponse,type);
    }


    protected Result request(String type,String url){
        return request(type,url,null);
    }

    protected Result request(String type,String url,DTO content){
        FakeRequest fakeRequest = new FakeRequest(type, url);
        fakeRequest.withHeader("Content-type", "application/json");

        if(content!=null) {
            fakeRequest.withJsonBody(Json.toJson(content),type);
        }
        if (connected) {
            fakeRequest.withSession(CommonSecurityController.SESSION_IDENTIFIER_STORE, EMAIL);
        }

        return routeAndCall(
                fakeRequest);
    }

    protected  <T> T requestWithDTo(String type,String url,Class<T> dto){
        return requestWithDTo(type,url,null,dto);
    }

    protected  <T> T requestWithDTo(String type,String url,DTO content,Class<T> dto){
        return getDTO(request(type, url, content), dto);
    }


}
