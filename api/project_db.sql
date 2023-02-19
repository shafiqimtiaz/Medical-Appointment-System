create sequence "Users_userID_seq"
    as integer;

create sequence "Patients_patientID_seq"
    as integer;

create table if not exists users
(
    user_id     integer default nextval('"Users_userID_seq"'::regclass) not null
        constraint users_pk
            primary key,
    email       varchar                                                 not null,
    hashed_pass varchar                                                 not null,
    name        varchar                                                 not null,
    dob         date                                                    not null,
    address     varchar                                                 not null,
    phone_nbr   varchar                                                 not null,
    role        varchar                                                 not null
);

alter sequence "Users_userID_seq" owned by users.user_id;

create index if not exists users_email_index
    on users (email);

create table if not exists patients
(
    patient_id integer default nextval('"Patients_patientID_seq"'::regclass) not null
        constraint patients_pk
            primary key,
    user_id    integer
        constraint patients_users_null_fk
            references users
);

alter sequence "Patients_patientID_seq" owned by patients.patient_id;

create table if not exists med_staff
(
    staff_id    serial
        constraint med_staff_pk
            primary key,
    user_id     integer               not null
        constraint med_staff_users_null_fk
            references users,
    license_nbr varchar               not null,
    is_approved boolean default false not null,
    role        varchar               not null
);

create table if not exists managers
(
    manager_id serial
        constraint managers_pk
            primary key,
    user_id    integer not null
        constraint unique_user
            unique
        constraint managers_users_null_fk
            references users
);

create table if not exists appointments
(
    appointment_id serial
        constraint appointments_pk
            primary key,
    staff_id       integer   not null
        constraint appointments_med_staff_null_fk
            references med_staff,
    patient_id     integer   not null
        constraint appointments_patients_null_fk
            references patients,
    time           timestamp not null
);

create index if not exists appointments_patient_id_index
    on appointments (patient_id);

create index if not exists appointments_staff_id_index
    on appointments (staff_id);

create table if not exists assessments
(
    assessment_id      serial
        constraint assessments_pk
            primary key,
    patient_id         integer                 not null
        constraint assessments_patients_null_fk
            references patients,
    assigned_staff     integer
        constraint assessments_med_staff_null_fk
            references med_staff,
    needs_counseling   boolean   default true  not null,
    time_of_assessment timestamp default now() not null,
    is_active          boolean   default true  not null,
    answer             varchar                 not null,
    answer2            varchar                 not null,
    answer3            varchar                 not null,
    answer4            varchar                 not null,
    answer5            varchar                 not null,
    answer6            varchar                 not null,
    answer7            varchar                 not null,
    answer8            varchar                 not null,
    answer9            varchar                 not null
);

create index if not exists assessments_needs_counseling_index
    on assessments (needs_counseling desc);

