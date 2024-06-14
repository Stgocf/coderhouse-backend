import dotenv from 'dotenv';

dotenv.config();

export const myconfig = {
    PORT: process.env.PORT ,
    MONGODBURI: process.env.MONGODBURI ,
    MONGODBSECRET: process.env.MONGODBSECRET ,
    
};

