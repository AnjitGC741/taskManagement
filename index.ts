import express from 'express';
import env from './src/config/env';
import { connectToDB } from './src/config/dbConnection';
import routes from './src/routes';
import bodyParser from 'body-parser';


(async ()=>{
    const app =  express();
    app.use(bodyParser.json());

    app.use('/api',routes);

    // app.use('*', (req, res) => {
    //     res.status(404).json({ message: 'Path not found' });
    // });

    app.listen(env.port,async()=>{
        await connectToDB();
        console.log("Sever is running on PORT:"+ env.port);
    })

     process.on('SIGINT',()=>{
        console.log('Shutting down server gracefully...');
        process.exit();
    });

    process.on('unhandledRejection',(reason,promise)=>{
        console.log(JSON.stringify({message:`Unhandled Rejection at:,${promise}`,error:reason}));
    });

    process.on('uncaughtException',error => {
        console.log(JSON.stringify({message:`Uncaught Exception:,  ${error}`}));
    });
})();
