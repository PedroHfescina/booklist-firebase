
import { useParams, Link, useNavigate } from 'react-router-dom';
import Notes from '../components/Notes.jsx';
import {useState, useEffect} from 'react';
import {useDispatch} from 'react-redux';
import {selectBooks, eraseBook, toggleRead} from '../store/booksSlice.js';
import { doc, getDoc } from "firebase/firestore";
import { db } from '../firebase/config.js';


function SingleBookPage() {
  
  const dispatch = useDispatch();
  const navigate = useNavigate();

  function handleEraseBook(id) {
    if(confirm('Are you sure you want to erase this book and all notes associated with it?')){
      dispatch(eraseBook(id));
      //dispatch(eraseBookNotes(id));
      navigate("/");
    }
  }

  function handleToggleRead(info) {
    dispatch(toggleRead({id: info.id, isRead: info.isRead})) 
    setBook({...book, isRead: !info.isRead});
    }

 const fetchBook = async (book_id) => {

    try {

      const docRef = doc(db, "books", book_id);
      const docSnap = await getDoc(docRef);
      
      if (docSnap.exists()) {
        setBook({...docSnap.data(), id: docSnap.id});
      } 
      setFetchStatus("success");
    }catch(err){
      console.log('error', err);
      setFetchStatus("error");
    }
  }

  const {id} = useParams();

  const [book, setBook] = useState("");
  const [fetchStatus, setFetchStatus] = useState("idle");

  
  useEffect(()=>{
    if(fetchStatus == 'idle'){
    fetchBook(id);
    }
  }, [])

    
    return (
      <>
        <div className="container">
            <Link to="/">
              <button className="btn">
                  ← Back to Books
              </button>
            </Link>

            {book ?
            
            <div>
              <div className="single-book">
                <div className="book-cover">
                    <img src={book.cover} />
                </div>

                <div className="book-details">
                    <h3 className="book-title">{ book.title }</h3>
                    <h4 className="book-author">{ book.author }</h4>
                    <p>{book.synopsis}</p>
                    <div className="read-checkbox">
                        <input 
                          onClick={()=>{handleToggleRead({id: book.id, isRead: book.isRead})}}
                          type="checkbox" 
                          defaultChecked={book.isRead} />
                        <label>{ book.isRead ? "Already Read It" : "Haven't Read it yet" }</label>
                    </div>
                    <div onClick={()=>handleEraseBook(book.id)} className="erase-book">
                        Erase book
                    </div>
                </div>
              </div>

              <Notes bookId={id} />
            </div> 
            
            : 
            
            <div>
              <p>Book not found. Click the button above to go back to the list of books.</p>
            </div>

            }
            

        </div>

        
      </>
    )
  }
  
  export default SingleBookPage
 

 