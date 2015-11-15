alter table account alter column gender DROP NOT NULL;

alter table account drop column dtype;

alter table logincredential drop column keepsessionopen;