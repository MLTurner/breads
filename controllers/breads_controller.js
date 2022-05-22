const express = require('express')
const bread = require('../models/bread')
const Baker = require('../models/baker.js')
const breads = express.Router()

// in the new route
breads.get('/new', (req, res) => {
    Baker.find()
        .then(foundBakers => {
            res.render('new', {
                bakers: foundBakers
            })
      })
})

//INDEX
breads.get('/', (req, res) => {
  Baker.find()
    .then(foundBakers => {
      bread.find()
      .then(foundBreads => {
        res.render('index', {
          breads: foundBreads,
          bakers: foundBakers,
          title: 'Index Page'
        })
      })
  })
})
  // res.render('index',
  //   {
  //     breads: Bread,
  //     title: 'Index Page'
  //   }
  // )



// NEW
breads.get('/new', (req, res) => {
  res.render('new')
})

// CREATE
breads.post('/', (req, res) => {
  if (!req.body.image) {
    req.body.image = undefined
  }
  if(req.body.hasGluten === 'on') {
    req.body.hasGluten = true
  } else {
    req.body.hasGluten = false
  }
  bread.create(req.body)
  res.redirect('/breads')
})

//Creating a seed route
breads.get('/data/seed', (req, res) => {
  bread.insertMany([
    {
      name: 'Rye',
      hasGluten: true,
      image: 'https://images.unsplash.com/photo-1595535873420-a599195b3f4a?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80',
    },
    {
      name: 'French',
      hasGluten: true,
      image: 'https://images.unsplash.com/photo-1534620808146-d33bb39128b2?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=634&q=80',
    },
    {
      name: 'Gluten Free',
      hasGluten: false,
      image: 'https://images.unsplash.com/photo-1546538490-0fe0a8eba4e6?ixlib=rb-1.2.1&ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&auto=format&fit=crop&w=1050&q=80',
    },
    {
      name: 'Pumpernickel',
      hasGluten: true,
      image: 'https://images.unsplash.com/photo-1586444248902-2f64eddc13df?ixlib=rb-1.2.1&ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&auto=format&fit=crop&w=1050&q=80',
    }
  ])
    .then(createdBreads => {
      res.redirect('/breads')
    })
})



// DELETE
breads.delete('/:id', (req, res) => {
  bread.findByIdAndDelete(req.params.id) 
    .then(deletedBread => { 
      res.status(303).redirect('/breads')
    })
})


// EDIT
breads.get('/:id/edit', (req, res) => {
  Baker.find()
    .then(foundBakers => {
      bread.findById(req.params.id) 
        .then(foundBread => { 
        res.render('edit', {
          bread: foundBread,
          bakers: foundBakers, 
    })
      })
    })
})


// SHOW
breads.get('/:id', (req, res) => {
  bread.findById(req.params.id)
      .populate('baker')
      .then(foundBread => {
        res.render('show', {
            bread: foundBread
        })
      })
    .catch(err => {
      res.send('404')
    })
})


// UPDATE
breads.put('/:arrayIndex', (req, res) => {
  if(req.body.hasGluten === 'on'){
    req.body.hasGluten = true
  } else {
    req.body.hasGluten = false
  }
  bread.findByIdAndUpdate(req.params.id, req.body, { new: true })
    .then(updatedBread => {
      console.log(updatedBread)
      res.redirect(`/breads/${req.params.id}`)
    })
})

   
module.exports = breads