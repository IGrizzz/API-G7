const express = require('express')
const dotenv = require('dotenv')
dotenv.config()
const router = require('./routes/routes')
const cors = require('cors')
const bodyParser = require('body-parser')


const openDbConnection = require('./helpers/db')

const PORT = process.env.PORT || 3000
const uri = process.env.MONGO_URI
const app = express();
app.use(cors())

    async function main(){
        try{
            await openDbConnection(uri);
            app.use(bodyParser.urlencoded({extended:true}))
            app.use(express.json());
            app.use(router);

            app.listen(PORT, () => {
                console.log('Server listening on', PORT)
            })
            
        }catch(error){
            console.log("main", error)
        }

    }


    main()