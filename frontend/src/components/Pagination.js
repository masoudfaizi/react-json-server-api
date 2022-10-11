import React from 'react'

export const Pagination = ({totalPosts, postPerPage, setCurrentPage}) => {
    let pages = [];

    for (let i = 1; i <= Math.ceil(totalPosts/postPerPage); i++){
        pages.push(i);
    }
  return (
    <tfoot>
    <tr><th colSpan="6">
        {
            pages.map((page, index) => {
                return (
                    
                    <div className="ui floated pagination menu">
                        <a className="item" key={index} onClick={() => setCurrentPage(page)}>{page}</a>         
                    </div>
                      
                );
            })
        }
     </th></tr></tfoot>
  )
}
