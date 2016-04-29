package be.lynk.server.dozerConverter;

import be.lynk.server.dto.BusinessCategoryFlatDTO;
import be.lynk.server.dto.BusinessCategoryLittleDTO;
import be.lynk.server.model.entities.BusinessCategory;
import be.lynk.server.model.entities.Translation;
import be.lynk.server.model.entities.TranslationValue;
import org.dozer.CustomConverter;
import org.dozer.DozerConverter;
import play.i18n.Lang;
import play.mvc.Http;

/**
 * Created by florian on 21/07/15.
 */
public class BusinessCategoryFlatConverter extends DozerConverter<BusinessCategory, BusinessCategoryFlatDTO> implements CustomConverter {
    public BusinessCategoryFlatConverter() {
        super(BusinessCategory.class, BusinessCategoryFlatDTO.class);
    }

    @Override
    public BusinessCategoryFlatDTO convertTo(BusinessCategory businessCategory, BusinessCategoryFlatDTO businessCategoryFlatDTO) {
        businessCategoryFlatDTO= new BusinessCategoryFlatDTO();

        if(businessCategory.getParent()!=null && businessCategory.getParent().getParent()!=null){

            //cat
            businessCategoryFlatDTO.setCategory(new BusinessCategoryLittleDTO(businessCategory.getParent().getParent().getName(),
                    getTranslation(businessCategory.getParent().getParent().getTranslationName())));

            //subCate
            businessCategoryFlatDTO.setSubCategory(new BusinessCategoryLittleDTO(businessCategory.getParent().getName(),
                    getTranslation(businessCategory.getParent().getTranslationName())));

            //subSubCate
            businessCategoryFlatDTO.setSubSubCategory(new BusinessCategoryLittleDTO(businessCategory.getName(),
                    getTranslation(businessCategory.getTranslationName())));
        }
        else if(businessCategory.getParent()!=null){

            //cat
            businessCategoryFlatDTO.setCategory(new BusinessCategoryLittleDTO(businessCategory.getParent().getName(),
                    getTranslation(businessCategory.getParent().getTranslationName())));

            //subCate
            businessCategoryFlatDTO.setSubCategory(new BusinessCategoryLittleDTO(businessCategory.getName(),
                    getTranslation(businessCategory.getTranslationName())));

        }
        else if(businessCategory!=null){

            //cat
            businessCategoryFlatDTO.setCategory(new BusinessCategoryLittleDTO(businessCategory.getName(),
                    getTranslation(businessCategory.getTranslationName())));

        }
        else {
            return null;
        }

        return businessCategoryFlatDTO;
    }

    @Override
    public BusinessCategory convertFrom(BusinessCategoryFlatDTO businessCategoryFlatDTO, BusinessCategory businessCategory) {
        return null;
    }

    private String getTranslation(Translation translation){
        String defaultText = null;
        String text = null;
        Lang lang = Http.Context.current().lang();
        for (TranslationValue translationValue : translation.getTranslationValues()) {
            if (translationValue.getLang().equals(lang)) {
                text = translationValue.getContent();
            }
            if (translationValue.getLang().equals("en")) {
                defaultText = translationValue.getContent();
            }
        }
        if (text == null) {
            return defaultText;
        }
        return text;
    }
}
