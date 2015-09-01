package be.lynk.server.model;

/**
 * Created by florian on 19/07/15.
 */
public enum SearchCriteriaEnum {

    CATEGORY("--.search.criteria.category", "category"),
    BUSINESS("--.search.criteria.business", "business"),
    PUBLICATION("--.search.criteria.publication", "publication");

    SearchCriteriaEnum(String nameRef, String key) {
        this.nameRef = nameRef;
        this.key = key;
    }

    private final String nameRef;
    private final String key;

    public String getNameRef() {
        return nameRef;
    }

    public String getKey() {
        return key;
    }

    public static SearchCriteriaEnum findByKey(String key) {
        for (SearchCriteriaEnum searchCriteriaEnum : SearchCriteriaEnum.values()) {
            if (searchCriteriaEnum.getKey().equals(key)) {
                return searchCriteriaEnum;
            }
        }
        return null;
    }
}
