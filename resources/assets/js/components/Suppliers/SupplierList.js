import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios'
import Autocomplete from 'react-autocomplete';
import { Link } from 'react-router-dom';


class SuppliersList extends Component {
constructor () {
    super()

    this.state = {
      suppliers: [],
      direction: 'asc',
      arrow: '↑',
      name: '',
      input: '',
      input2: '',
      page: 0,
      query: '',
      message: '',
      autocompleteData: [],
      height: window.innerHeight,

    }
    this.sortBy = this.sortBy.bind(this);
 	this.handleChange = this.handleChange.bind(this);

 	this.handleScroll = this.handleScroll.bind(this);
 	this.GetSearchResults = this.GetSearchResults.bind(this);
 	this.handleChangeSearch = this.handleChangeSearch.bind(this);


 		this.onChange = this.onChange.bind(this);
        this.onSelect = this.onSelect.bind(this);
        this.getItemValue = this.getItemValue.bind(this);
        this.renderItem = this.renderItem.bind(this);
        this.retrieveDataAsynchronously = this.retrieveDataAsynchronously.bind(this);
        this.onMenuVisibilityChange = this.onMenuVisibilityChange.bind(this);
  }

  //	Lazy Load
  //------------------

  componentDidMount () {
    axios.get('/suppliers').then(response => {
      this.setState({
        suppliers: response.data
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
	      	axios.get('/suppliers?page='+this.state.page).then(response => {
	      	
	     	 this.setState({
	        suppliers: [...this.state.suppliers, ...response.data]
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

	onMenuVisibilityChange(isOpen)
  {
    this.retrieveDataAsynchronously("");
  }


	GetSearchResults() {

		var fields = ["code","title"];
		var str = this.state.query;
		var res = str.replace("+", "%2B");
		
    axios.get('/suppliers/search?q='+res+'&fields='+fields).then(response => {
	      	
	     	 this.setState({
	       suppliers: response.data

	      });
	     
	     }).catch(errors => {

       console.log(errors);
     })
  }

retrieveDataAsynchronously(searchText){
       
       var fields = ["code","title"];

        axios.get('/suppliers/search?q='+searchText+'&fields='+fields).then(response => {
 
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
               {item.code} {item.title}
            </div>   
        ); 
    }

    
    getItemValue(item){
        
        return `${item.title}`;
    }



   			 //Autocomplete
//----------------------------------------------


	deleteUser(supplier) { 
		
		var ask = window.confirm("Ar tikrai norite ištrinti įrašą?");
		if(ask)
		{
			//BackEnd delete
			var $this = this
			axios.delete(`/suppliers/${supplier.id}/delete`).then(response => {
			//FroontEnd delete
			const newState = $this.state.suppliers.slice();
			newState.splice(newState.indexOf(supplier), 1)
			$this.setState({
				suppliers: newState
			})

			}).catch(error => {
				console.log(error)
			})
		}
			
		}

	handleChange(event) {
		this.setState({
			input: event.target.value,
		})
	}


	sortBy(key) {
	var dir = this.state.direction;

	this.state.suppliers.forEach(function(entry) {
			
				
				if(entry.address === null)
				{
					entry.address = ''
				}
				if(entry.contact === null)
				{
					entry.contact = ''
				}
				if(entry.phone === null)
				{
					entry.phone = ''
				}			
		});

		this.state.suppliers =  this.state.suppliers.sort(function(a, b) {
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


render() {

	const { suppliers } = this.state
	
		let FilteredList = suppliers.filter(word => {

			if(word.address === null)
				{
					word.address = ''
				}
				if(word.contact === null)
				{
					word.contact = ''
				}
				if(word.phone === null)
				{
					word.phone = ''
				}

			if(word.code.toLowerCase().indexOf(this.state.input.toLowerCase()) !== -1)
			{
				return true;
			}
			if(word.title.toLowerCase().indexOf(this.state.input.toLowerCase()) !== -1)
			{
				return true;
			}
			if(word.address.toLowerCase().indexOf(this.state.input.toLowerCase()) !== -1)
			{
				return true;
			}
			if(word.contact.toLowerCase().indexOf(this.state.input.toLowerCase()) !== -1)
			{
				return true;
			}
			if(word.email.toLowerCase().indexOf(this.state.input.toLowerCase()) !== -1)
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
                <div className="card-header"><h1 align="center">Suppliers</h1></div>

                {Alert}

                <Link to={'create'} className="btn btn-primary">Add Supplier</Link>
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
			                    onMenuVisibilityChange={this.onMenuVisibilityChange}
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
						<thead style={{border: 'none'}}>
						<tr>
							<th onClick={this.sortBy.bind(this, 'code')}>Code {this.state.name === 'code' ? this.state.arrow : ''}</th>
							<th onClick={this.sortBy.bind(this, 'title')}>Title {this.state.name === 'title' ? this.state.arrow : ''}</th>
							<th onClick={this.sortBy.bind(this, 'address')}>Adress {this.state.name === 'address' ? this.state.arrow : ''}</th>
							<th onClick={this.sortBy.bind(this, 'contact')}>Contact {this.state.name === 'contact' ? this.state.arrow : ''}</th>
							<th onClick={this.sortBy.bind(this, 'email')}>Email {this.state.name === 'email' ? this.state.arrow : ''}</th>
							<th onClick={this.sortBy.bind(this, 'phone')}>Phone {this.state.name === 'phone' ? this.state.arrow : ''}</th>
							<th></th>
							<th></th>
						</tr>
											
						</thead>
			<tbody>
							
							{FilteredList.map(supplier =>(
								<tr key={supplier.id}> 
								<td>{supplier.code}</td>
								<td>{supplier.title}</td>
								<td>{supplier.address}</td>
								<td>{supplier.contact}</td>
								<td>{supplier.email}</td>
								<td>{supplier.phone}</td>
								<td><Link to={`/ssuppliers/${supplier.id}`} className='btn btn-info btn-sm' title="Edit"><span className="oi oi-wrench"></span></Link></td>
								<td><div className='btn btn-danger btn-sm' title="Delete" onClick={this.deleteUser.bind(this, supplier)}><span className="oi oi-trash"></span></div></td>
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


export default SuppliersList;

