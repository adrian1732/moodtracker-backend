import express from 'express';
import bodyParser from 'body-parser';
import { MongoClient } from 'mongodb';
import path from 'path';


const app = express();

app.use(express.static(path.join(__dirname, '/build')));
app.use(bodyParser.json());

const withDB = async (operations, res) => {
    try {
        const client = await MongoClient.connect('mongodb://localhost:27017', { useNewUrlParser: true });
        const db = client.db('my-blog');
    
        await operations(db);
    
        client.close();
    } catch (error) {
        res.status(500).json({ message: 'Error connecting to db', error });
    }
}

app.post('/api/upvoteEmail', async (req, res) => {
    withDB(async (db) => {
        //const articleName = req.params.name;
    
        const articleInfo = await db.collection('articles').findOne({ name: "learn-react" });
        await db.collection('articles').updateOne({ name: "learn-react" }, {
            '$set': {
                upvotes: articleInfo.upvotes + 10,
                upvoteEmail: articleInfo.upvoteEmail + 10,
            },
        });
        const updatedArticleInfo = await db.collection('articles').findOne({ name: "learn-react" });
    
        res.status(200).json(updatedArticleInfo);
    }, res);
});

app.post('/api/downvoteEmail', async (req, res) => {
    withDB(async (db) => {
        //const articleName = req.params.name;
    
        const articleInfo = await db.collection('articles').findOne({ name: "learn-react" });
        await db.collection('articles').updateOne({ name: "learn-react" }, {
            '$set': {
                upvotes: articleInfo.upvotes - 10,
                upvoteEmail: articleInfo.upvoteEmail - 10,
            },
        });
        const updatedArticleInfo = await db.collection('articles').findOne({ name: "learn-react" });
    
        res.status(200).json(updatedArticleInfo);
    }, res);
});


app.post('/api/upvoteCase', async (req, res) => {
    withDB(async (db) => {
        //const articleName = req.params.name;
    
        const articleInfo = await db.collection('articles').findOne({ name: "learn-react" });
        await db.collection('articles').updateOne({ name: "learn-react" }, {
            '$set': {
                upvotes: articleInfo.upvotes + 50,
                upvoteCase: articleInfo.upvoteCase + 50,
            },
        });
        const updatedArticleInfo = await db.collection('articles').findOne({ name: "learn-react" });
    
        res.status(200).json(updatedArticleInfo);
    }, res);
});

app.post('/api/downvoteCase', async (req, res) => {
    withDB(async (db) => {
        //const articleName = req.params.name;
    
        const articleInfo = await db.collection('articles').findOne({ name: "learn-react" });
        await db.collection('articles').updateOne({ name: "learn-react" }, {
            '$set': {
                upvotes: articleInfo.upvotes - 50,
                upvoteCase: articleInfo.upvoteCase - 50,
            },
        });
        const updatedArticleInfo = await db.collection('articles').findOne({ name: "learn-react" });
    
        res.status(200).json(updatedArticleInfo);
    }, res);
});


app.post('/api/upvoteThinking', async (req, res) => {
    withDB(async (db) => {
        //const articleName = req.params.name;
    
        const articleInfo = await db.collection('articles').findOne({ name: "learn-react" });
        await db.collection('articles').updateOne({ name: "learn-react" }, {
            '$set': {
                upvotes: articleInfo.upvotes + 30,
                upvoteCalls: articleInfo.upvoteCalls + 30,
            
            },
        });
        const updatedArticleInfo = await db.collection('articles').findOne({ name: "learn-react" });
    
        res.status(200).json(updatedArticleInfo);
    }, res);
});

app.post('/api/downvoteThinking', async (req, res) => {
    withDB(async (db) => {
        //const articleName = req.params.name;
    
        const articleInfo = await db.collection('articles').findOne({ name: "learn-react" });
        await db.collection('articles').updateOne({ name: "learn-react" }, {
            '$set': {
                upvotes: articleInfo.upvotes - 30,
                upvoteCalls: articleInfo.upvoteCalls - 30,
            },
        });
        const updatedArticleInfo = await db.collection('articles').findOne({ name: "learn-react" });
    
        res.status(200).json(updatedArticleInfo);
    }, res);
});







app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname + '/build/index.html'));
});

app.listen(8000, () => console.log('Listening on port 8000'));