const express = require('express');
const app = express();
const dotenv = require('dotenv').config();
const mongoose = require('mongoose');
const methodOverride = require('method-override');
const morgan = require('morgan');
const connectToDB = require('./db');
const Food = require('./models/Food')

app.use(express.static('public')); //all static files are in the public folder
app.use(express.urlencoded({ extended: false })); // this will allow us to see the data being sent in the POST or PUT
app.use(methodOverride('_method'))
app.use(morgan('dev'))

connectToDB()

//Routes

app.get('/', (request, response) => {
    response.render('homepage.ejs')
})

app.get('/food/new', (request, response) => {
    response.render('create-food.ejs')
})



//CREATE

app.post('/foods', async (request, response) => {
    const newFood =
    {
        name: request.body.name,
        description: request.body.description,
        image: request.body.image
    }
    console.log(newFood)
    await Food.create(newFood)
    response.redirect('/')
})

//UPDATE

app.get('/foods/:id/edit', async (request, response) => {
    const foundFood = await Food.findById(request.params.id)
    response.render('edit-food.ejs', { food: foundFood })
})

app.put('/foods/:id', async (request, response) => {
    const updatedFood =
    {
        name: request.body.name,
        description: request.body.description,
        image: request.body.image
    }

    await Food.findByIdAndUpdate(request.params.id, updatedFood)
    response.redirect('/foods')
})

//READ ALL

app.get('/foods', async (request, response) => {
    const allFoods = await Food.find()
    response.render('food-list.ejs', { allFoods: allFoods })
})

// READ BY ID

app.get('/foods/:id', async (request, response) => {
    console.log(request.params.id)
    const foundFood = await Food.findById(request.params.id)
    console.log(foundFood)
    response.render('food-details.ejs', { food: foundFood })
})

//DELETE

app.delete('/foods/:id', async (request, response) => {
    await Food.findByIdAndDelete(request.params.id)
    response.redirect('/foods')
})

app.listen(3000, () => {
    console.log("THE APP IS RUNNING ON PORT " + 3000)
})


