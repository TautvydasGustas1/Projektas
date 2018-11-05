import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios'
import Autocomplete from 'react-autocomplete';
import { Link } from 'react-router-dom';


class ProductsPrice extends Component {
constructor () {
    super()

    this.state = {
      customers: [],
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
    axios.get('/customers').then(response => {
      this.setState({
        customers: response.data
      })
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
	      	axios.get('/customers?page='+this.state.page).then(response => {
	      	
	     	 this.setState({
	        customers: [...this.state.customers, ...response.data]
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

	var fields = ["first_name", "last_name"];
	var str = this.state.query;
	var res = str.replace("+", "%2B");

    axios.get('/customers/search?q='+res+'&fields='+fields).then(response => {
	      	
	     	 this.setState({
	       customers: response.data

	      });
	     
	     }).catch(errors => {

       console.log(errors);
     })
  }

retrieveDataAsynchronously(searchText){
       

		var fields = ["first_name", "last_name"];

        axios.get('/customers/search?q='+searchText+'&fields='+fields).then(response => {
 
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
            <div style={{ background: isHighlighted ? 'lightgray' : 'white' }}>
               {item.first_name} {item.last_name}
            </div>   
        ); 
    }

    
    getItemValue(item){
        
        return `${item.last_name}`;
    }



   			 //Autocomplete
//----------------------------------------------

	deleteUser(customer) {

		var ask = window.confirm("Ar tikrai norite ištrinti įrašą?");
		if(ask)
		{
			var $this = this
			axios.delete(`/customers/${customer.id}/delete`).then(response => {
			//FroontEnd delete
			const newState = $this.state.customers.slice();
			newState.splice(newState.indexOf(customer), 1)
			$this.setState({
				customers: newState
			})

			}).catch(error => {
				console.log(error)
			})			
		}
		//BackEnd delete
	}

	sortBy(key) {
	var dir = this.state.direction;

	this.state.customers.forEach(function(entry) {
			
				if(entry.first_name === null)
				{
					entry.first_name = ''
				}
				if(entry.last_name === null)
				{
					entry.last_name = ''
				}
				if(entry.email === null)
				{
					entry.email = ''
				}
				if(entry.address === null)
				{
					entry.address = ''
				}
				if(entry.phone === null)
				{
					entry.phone = ''
				}			
		});

		this.state.customers =  this.state.customers.sort(function(a, b) {
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
	const { customers } = this.state


	let FilteredList = customers.filter(word => {

			if(word.first_name === null)
			{
				word.first_name = ''
			}
			if(word.last_name === null)
			{
				word.last_name = ''
			}
			if(word.email === null)
			{
				word.email = ''
			}
			if(word.address === null)
			{
				word.address = ''
			}
			if(word.phone === null)
			{
				word.phone = ''
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
			if(word.address.toLowerCase().indexOf(this.state.input.toLowerCase()) !== -1)
			{
				return true;
			}
			if(word.phone.toLowerCase().indexOf(this.state.input.toLowerCase()) !== -1)
			{
				return true;
			}
		});

	// Alert 
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
                <div className="card-header"><h1 align="center">Customers</h1></div>

               {Alert}
                
                <Link to={'create'} className="btn btn-primary">Add Customer</Link>

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
							<th onClick={this.sortBy.bind(this, 'first_name')}>First Name {this.state.name === 'first_name' ? this.state.arrow : ''}</th>
							<th onClick={this.sortBy.bind(this, 'last_name')}>Last Name {this.state.name === 'last_name' ? this.state.arrow : ''}</th>
							<th onClick={this.sortBy.bind(this, 'email')}>Email {this.state.name === 'email' ? this.state.arrow : ''}</th>
							<th onClick={this.sortBy.bind(this, 'address')}>Address {this.state.name === 'address' ? this.state.arrow : ''}</th>
							<th onClick={this.sortBy.bind(this, 'phone')}>Phone {this.state.name === 'phone' ? this.state.arrow : ''}</th>
							<th></th>
							<th></th>
						</tr>

						
							
						</thead>
			<tbody>
							
							{FilteredList.map(customer =>(
								<tr key={customer.id}> 
								<td>{customer.first_name}</td>
								<td>{customer.last_name}</td>
								<td>{customer.email}</td>
								<td>{customer.address}</td>
								<td>{customer.phone}</td>
								<td><Link to={`/ccustomers/${customer.id}`} className='btn btn-info btn-sm' title="Edit"><span className="oi oi-wrench"></span></Link></td>
								<td><div className='btn btn-danger btn-sm' title="Delete" onClick={this.deleteUser.bind(this, customer)}><span className="oi oi-trash"></span></div></td>
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

export default ProductsPrice;