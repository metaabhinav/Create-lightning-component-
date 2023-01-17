public with sharing class ContactCreationController {
    public ContactCreationController() {

    }
    @AuraEnabled
    public static Contact createContact(Contact contactObj){
        try {
            insert contactObj;
            return contactObj;
        } catch (Exception e) {
            throw new AuraHandledException(e.getMessage());
        }
    }
}
