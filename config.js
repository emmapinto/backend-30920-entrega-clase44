import "dotenv/config"

export const firebaseData =  {
    type: "service_account",
    project_id: "coder-backend-ecommerce-eda88",
    private_key_id: `${process.env.FB_PRIVATE_KEY_ID.replace(/\\n/g, '\n')}`,
    private_key: `${process.env.FB_PRIVATE_KEY.replace(/\\n/g, '\n')}`,
    client_email: "firebase-adminsdk-5969g@coder-backend-ecommerce-eda88.iam.gserviceaccount.com",
    client_id: "108534717867382122906",
    auth_uri: "https://accounts.google.com/o/oauth2/auth",
    token_uri: "https://oauth2.googleapis.com/token",
    auth_provider_x509_cert_url: "https://www.googleapis.com/oauth2/v1/certs",
    client_x509_cert_url: "https://www.googleapis.com/robot/v1/metadata/x509/firebase-adminsdk-5969g%40coder-backend-ecommerce-eda88.iam.gserviceaccount.com"
}

//pasar PERSISTENCIA por ARGUMENTO en la linea de comandos
// export const variables = {
//     TIPO_PERSISTENCIA: process.argv[2] || "mongo",
// }

//pasar PERSISTENCIA por VARIABLE DE ENTORNO
export const variables = {
    TIPO_PERSISTENCIA: process.env.PERSISTENCIA || "mongo",
}