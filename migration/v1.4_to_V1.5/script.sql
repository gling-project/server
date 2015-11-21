

alter table account add column selectedAddress_id bigint;

alter table account add CONSTRAINT fk_o7e7jroiergvkwsksulendje7gvt FOREIGN KEY (selectedAddress_id)
      REFERENCES address (id) MATCH SIMPLE
      ON UPDATE NO ACTION ON DELETE NO ACTION;

update account set selectedAddress_id = (select selectedbyaccount_id from address where account_id = account.id);

alter table address drop column selectedbyaccount_id;