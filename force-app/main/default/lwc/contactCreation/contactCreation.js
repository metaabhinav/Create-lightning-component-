import { LightningElement, track } from 'lwc';
import createContact from '@salesforce/apex/ContactCreationController.createContact';
import CONTACT_FIRSTNAME from '@salesforce/schema/Contact.FirstName';
import CONTACT_LASTNAME from '@salesforce/schema/Contact.LastName';
import CONTACT_EMAIL from '@salesforce/schema/Contact.Email';
import CONTACT_PHONE from '@salesforce/schema/Contact.Phone';
import CONTACT_FAX from '@salesforce/schema/Contact.Fax';
import {ShowToastEvent} from 'lightning/platformShowToastEvent'

export default class ContactCreation extends LightningElement {

    @track contactid;
    @track error;
    @track contactRecord = {
        FirstName:CONTACT_FIRSTNAME,
        LastName:CONTACT_LASTNAME,
        Email:CONTACT_EMAIL,
        Phone:CONTACT_PHONE,
        Fax:CONTACT_FAX
    };
    handleFNameChange(event){
        this.contactRecord.FirstName = event.target.value;
    }
    handleLNameChange(event){
        this.contactRecord.LastName = event.target.value;
    }
    handleEmailChange(event){
        this.contactRecord.Email = event.target.value;
    }
    handlePhoneChange(event){
        this.contactRecord.Phone = event.target.value;
    }
    handleFaxChange(event){
        this.contactRecord.Fax = event.target.value;
    }
    handleSaveContact(){
        createContact({contactObj:this.contactRecord})
        .then(result=>{
            this.contactRecord = {};
            this.contactid = result.Id;
            const toastEvent = new ShowToastEvent({
                title:'Success!!!',
                message:'Contact is created',
                variant:'success'
            });
            this.dispatchEvent(toastEvent);
        })
        .catch(error=>{
            this.error = error.message;
        }); 
    }
}