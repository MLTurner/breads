const React = require('react')
const bread = require('../models/bread')
const Default = require('./layouts/Default')

function Index (data) {
    return (
      <Default title={data.title}>
        <h2>Index Page</h2>
        <ul>
          {
            data.breads.map((breads, index)=> {
              return (
              <li key={index}>
                <a href={`/breads/${bread.id}`}>
                  {breads.name}
                </a>
              </li>
              )
            })
          }
        </ul>
        <div className="newButton">
          <a href="/breads/new"><button>Add a new bread</button></a>
        </div> 
      </Default>
    )
}

module.exports = Index
