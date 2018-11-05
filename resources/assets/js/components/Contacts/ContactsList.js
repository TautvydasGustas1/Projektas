import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios'
import Autocomplete from 'react-autocomplete';
import { Link } from 'react-router-dom';


class Contacts extends Component {
constructor () {
    super()

    this.state = {
      contacts: [],
      input: '',
      page: 0,
      query: '',
      autocompleteData: [],
      height: window.innerHeight,
      message: ''
    }
 this.handleChange = this.handleChange.bind(this);

 	this.handleScroll = this.handleScroll.bind(this);
 	this.GetSearchResults = this.GetSearchResults.bind(this);
 	this.handleChangeSearch = this.handleChangeSearch.bind(this);

 		this.onChange = this.onChange.bind(this);
        this.onSelect = this.onSelect.bind(this);
        this.getItemValue = this.getItemValue.bind(this);
        this.renderItem = this.renderItem.bind(this);
        this.retrieveDataAsynchronously = this.retrieveDataAsynchronously.bind(this);
  }

  //	Lazy Load
  //------------------

  componentDidMount () {
    axios.get('/contactsIndex').then(response => {
      this.setState({
        contacts: response.data
      })
   //	console.log(this.state.contacts[0].get_suppliers_i_d.code);
    })
    window.addEventListener("scroll", this.handleScroll);
    this.state.message = this.props.location.state;
  }

  handleScroll() {


   const windowHeight = "innerHeight" in window ? window.innerHeight : document.documentElement.offsetHeight;
        const body = document.body;
        const html = document.documentElement;
        const docHeight = Math.max(body.scrollHeight, body.offsetHeight, html.clientHeight, html.scrollHeight, html.offsetHeight);
        const windowBottom = windowHeight + window.pageYOffset + 10;
        
        if (windowBottom >= docHeight) {
           
        	this.state.page += 25;
	      	axios.get('/contactsIndex?page='+this.state.page).then(response => {
	      	
	     	 this.setState({
	        contacts: [...this.state.contacts, ...response.data]
	      });
	    }) 

        } 
  }

  componentWillUnmount() {
    window.removeEventListener("scroll", this.handleScroll);
  }

  //--------------------

  		// Search
  //----------------------------------------------------
  handleChangeSearch(event) {
		this.setState({
			query: event.target.value,
		})
	}
	
	GetSearchResults() {
	var fields = ["last_name","first_name","title","supplier_id"];

	var str = this.state.query;
	var res = str.replace("+", "%2B");

    axios.get('/contacts/search?q='+res+'&fields='+fields).then(response => {
	      	console.log(response.data)
	     	 this.setState({
	       contacts: response.data

	      });
	     
	     }).catch(errors => {

       console.log(errors);
     })
  }

retrieveDataAsynchronously(searchText){
       
		var fields = ["last_name","first_name","title","supplier_id"];
		//var fields  = toString(obj);

        axios.get('/contacts/search?q='+searchText+'&fields='+fields) .then(response => {
 
         this.setState({
           autocompleteData: response.data
         });
        

     }).catch(errors => {

       console.log(errors);
     })

    }
    

    onChange(e){
        this.setState({
            query: e.target.value
        });
            

        this.retrieveDataAsynchronously(e.target.value)
    }

  
    onSelect(val){

        this.setState({
            query: val
        });
      

    }

   
    renderItem(item, isHighlighted){
        return (
            <div key={item.id} style={{ background: isHighlighted ? 'lightgray' : 'white' }}>
                {item.title} {item.first_name} {item.last_name} 
            </div>   
        ); 
    }

    
    getItemValue(item){
        
        return `${item.title}`;
    }



   			 //Autocomplete
//----------------------------------------------

	deleteUser(contact) {
		var ask = window.confirm("Ar tikrai norite ištrinti įrašą?");
		if(ask)
		{
			//BackEnd delete
			var $this = this
			axios.delete(`/contacts/${contact.id}/delete`).then(response => {
			//FroontEnd delete
			const newState = $this.state.contacts.slice();
			newState.splice(newState.indexOf(contact), 1)
			$this.setState({
				contacts: newState
			})

			}).catch(error => {
				console.log(error)
			})		
		}
	}

	sortBy(key) {
	var dir = this.state.direction;

	this.state.contacts.forEach(function(entry) {
			
				if(entry.first_name === null)
				{
					entry.first_name = ''
				}
				if(entry.last_name === null)
				{
					entry.last_name = ''
				}
				if(entry.title === null)
				{
					entry.title = ''
				}
				if(entry.email === null)
				{
					entry.email = ''
				}
				if(entry.get_suppliers_i_d.title === null)
				{
					entry.get_suppliers_i_d.title = ''
				}
				if(entry.address === null)
				{
					entry.address = ''
				}
				if(entry.phone === null)
				{
					entry.phone = ''
				}
				if(entry.comments === null)
				{
					entry.comments = ''
				}				
		});

		this.state.contacts =  this.state.contacts.sort(function(a, b) {
		  var nameA = a[key].toUpperCase(); 
		  var nameB = b[key].toUpperCase();

		  if(dir === 'asc')
		  {
			  if (nameA < nameB) {
			    return -1;
			  }
			  if (nameA > nameB) {
			    return 1;
			  }
			  return 0;
		  }
		  else 
		  {
		  	if (nameB < nameA) {
			    return -1;
			  }
			  if (nameB > nameA) {
			    return 1;
			  }
			  return 0;
		  }

			});




		this.setState({
			direction: this.state.direction === 'asc' ? 'desc' : 'asc',
			arrow: this.state.arrow === '↓' ? '↑' : '↓'
 		})

 			this.state.name = key
}

handleChange(event) {
		this.setState({
			input: event.target.value
		})
	}


render() {
	const { contacts } = this.state


	let FilteredList = contacts.filter(word => {

			if(word.first_name === null)
			{
				word.first_name = ''
			}
			if(word.last_name === null)
			{
				word.last_name = ''
			}
			if(word.title === null)
			{
				word.title = ''
			}
			if(word.email === null)
			{
				word.email = ''
			}
			if(word.get_suppliers_i_d.title === null)
			{
				word.get_suppliers_i_d.title = ''
			}
			if(word.address === null)
			{
				word.address = ''
			}

			if(word.phone === null)
			{
				word.phone = ''
			}
			if(word.comments === null)
			{
				word.comments = ''
			}

			if(word.first_name.toLowerCase().indexOf(this.state.input.toLowerCase()) !== -1)
			{
				return true;
			}			
			if(word.last_name.toLowerCase().indexOf(this.state.input.toLowerCase()) !== -1)
			{
				return true;
			}
			
			if(word.email.toLowerCase().indexOf(this.state.input.toLowerCase()) !== -1)
			{
				return true;
			}
			if(word.get_suppliers_i_d.title.toLowerCase().indexOf(this.state.input.toLowerCase()) !== -1)
			{
				return true;
			}
			if(word.address.toLowerCase().indexOf(this.state.input.toLowerCase()) !== -1)
			{
				return true;
			}
			if(word.phone.toLowerCase().indexOf(this.state.input.toLowerCase()) !== -1)
			{
				return true;
			}
			if(word.comments.toLowerCase().indexOf(this.state.input.toLowerCase()) !== -1)
			{
				return true;
			}
			if(word.title.toLowerCase().indexOf(this.state.input.toLowerCase()) !== -1)
			{
				return true;
			}
		});

	if(this.state.message !== '' && this.state.message !== undefined)
	{
		var Alert = <div align='center' className="alert alert-success" role="alert">
                				  {this.state.message.some}
                				</div>
	}

	return(
<div className="container">
    <div className="row justify-content-center" style={{display: '-webkit-box'}}>
            <div className="card" style={{minWidth: 'auto'}}>
                <div className="card-header"><h1 align="center">Contacts</h1></div>

                	{Alert}
                	
                <Link to={'create'} className="btn btn-primary">Add Contact</Link>

                <div className="container" style={{margin: "0px", maxWidth: "520px"}}>
                <div className="row" style={{paddingTop: "15px"}}> 
                	<div className="col-md-auto" style={{width: "50%"}}>
                		<div className="input-group" style={{flexWrap: 'inherit'}}>
							 <Autocomplete  
			                    getItemValue={this.getItemValue}
			                    items={this.state.autocompleteData}
			                    renderItem={this.renderItem}
			                    value={this.state.query}
			                    onChange={this.onChange}
			                    onSelect={this.onSelect}
			                    menuStyle = {{position: 'absolute', maxHeight: '300px', top: 'auto', left: 'auto', borderRadius: '3px', boxShadow: '0 2px 12px rgba(0, 0, 0, 0.1)', overflowY: 'auto', fontSize: '90%', padding: '2px 0'}}
			                    inputProps={{className: "form-control", placeholder: "Search..."}}
			             	  />
			             	 	 <div className="input-group-append">
							   	 <button className="btn btn-primary" onClick={this.GetSearchResults}><span className="oi oi-magnifying-glass"></span></button>
			             	  	</div>
			            </div>

                	</div>
                		<div className="col-md-auto" style={{width: "50%"}}>
			            		<input className = "form-control" style={{maxWidth: '184px'}} id="myInput" placeholder="Filter..." value={this.state.input} onChange={this.handleChange} />
                		</div>
                	
                </div>
                </div>
                

                <div className="card-body">
                 	
					<table className="table table-sm"> 
						<thead>
						<tr>
							<th onClick={this.sortBy.bind(this, 'title')}>Title {this.state.name === 'title' ? this.state.arrow : ''}</th>
							<th onClick={this.sortBy.bind(this, 'first_name')}>First Name {this.state.name === 'first_name' ? this.state.arrow : ''}</th>
							<th onClick={this.sortBy.bind(this, 'last_name')}>Last Name {this.state.name === 'last_name' ? this.state.arrow : ''}</th>
							<th onClick={this.sortBy.bind(this, 'email')}>Email {this.state.name === 'email' ? this.state.arrow : ''}</th>
							<th onClick={this.sortBy.bind(this, 'get_suppliers_i_d.title')}>Supplier {this.state.name === 'get_suppliers_i_d.title' ? this.state.arrow : ''}</th>
							<th onClick={this.sortBy.bind(this, 'address')}>Address {this.state.name === 'address' ? this.state.arrow : ''}</th>
							<th onClick={this.sortBy.bind(this, 'phone')}>Phone {this.state.name === 'phone' ? this.state.arrow : ''}</th>
							<th onClick={this.sortBy.bind(this, 'comments')}>Comments {this.state.name === 'comments' ? this.state.arrow : ''}</th>
							<th></th>
							<th></th>
						</tr>
						
							
						</thead>
			<tbody>
							
							{FilteredList.map(contact =>(
								<tr key={contact.id}>
								<td>{contact.title}</td> 
								<td>{contact.first_name}</td>
								<td>{contact.last_name}</td>
								<td>{contact.email}</td>
								<td>{contact.get_suppliers_i_d.title}</td>
								<td>{contact.address}</td>
								<td>{contact.phone}</td>
								<td>{contact.comments}</td>
								<td><Link to={`/contacts/${contact.id}`} className='btn btn-info btn-sm' title="Edit"><span className="oi oi-wrench"></span></Link></td>
								<td><div className='btn btn-danger btn-sm' title="Delete" onClick={this.deleteUser.bind(this, contact)}><span className="oi oi-trash"></span></div></td>
								</tr>
								))}
									
			</tbody>
                
						</table>
                
                </div>
            </div>
        </div>
    </div>
	);
}

}

export default Contacts;