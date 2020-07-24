import React from 'react'

const FormView = (props) => {
    return(
            <div className='form'>

            {/* Login */}

            {props.user ?
                <button onClick={props.logout}>Log Out</button>
                :
                <button onClick={props.login}>Login</button>
            }


            {/* Logged In View */}

            {props.user ?


            <div className='uploadArticle'>

                <h1>Logged in View</h1>
                <p>Hello, {props.user.displayName}</p>
                
                
                

                {
                    props.viewForm ?
                    <div>
                        <h1>New Article</h1>
                        
                            <form name="myForm" onSubmit={props.onSubmit}>
                                <p>Title</p>
                                <input                    
                                    form="myForm"
                                    type="text"
                                    name="title"
                                    onChange={props.handleChange}                   
                                    required
                                    defaultValue={props.title}>
                                </input>

                                <p>Text</p>
                                <textarea
                                    form="myForm"
                                    type="text"
                                    name="text"
                                    onChange={props.handleChange}
                                    required
                                    rows="10"
                                    value={props.article}
                                ></textarea>    

                                    
                                <button>Upload</button>                
                            </form>
                    </div>
                   
                   
                    :
                    <div>
                        <h1>Upload</h1>
                        <p>You have the maximum number (1) of articles on the website. Please delete or edit your existing article.</p>
                    </div>
                    
                   
                }
                <h1>Current Articles</h1>
                {props.test1}

          

                    




                

            
            </div>
            :
            // Logged Out View
            <div>
                <h1>Logged Out View</h1>
            </div>
            }


            </div>
    )
}

export default FormView;

