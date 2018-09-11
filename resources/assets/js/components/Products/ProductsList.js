import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios'
import Autocomplete from 'react-autocomplete';
import { Link } from 'react-router-dom';


class ProductsList extends Component {
constructor () {
    super()

    this.state = {
      products: [],
       direction: 'asc',
      arrow: '↑',
      name: '',
      input: '',
      query: '',
      message: '',
      tempArray: [],
      page: 10,
      results: [],
      height: window.innerHeight,
      autocompleteData: []

    }
		  this.sortBy = this.sortBy.bind(this);
		  this.handleChange = this.handleChange.bind(this);
		  this.handleScroll = this.handleScroll.bind(this);
		  this.handleChangeSearch = this.handleChangeSearch.bind(this);
		  this.GetSearchResults = this.GetSearchResults.bind(this);

 		this.onChange = this.onChange.bind(this);
        this.onSelect = this.onSelect.bind(this);
        this.getItemValue = this.getItemValue.bind(this);
        this.renderItem = this.renderItem.bind(this);
        this.retrieveDataAsynchronously = this.retrieveDataAsynchronously.bind(this);
  }

//----------------------------------------------------

retrieveDataAsynchronously(searchText){
       
        axios.get('/products/search?q='+searchText).then(response => {
 
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
             {item.title} 
             
            </div>   
        ); 
    }

    
    getItemValue(item){
        
        return `${item.title}`;
    }



   			 //Autocomplete
//----------------------------------------------



  componentDidMount () {
    axios.get('/products').then(response => {
      this.setState({
        products: response.data
      })
    })
    window.addEventListener("scroll", this.handleScroll);
  }

  handleScroll() {


   const windowHeight = "innerHeight" in window ? window.innerHeight : document.documentElement.offsetHeight;
        const body = document.body;
        const html = document.documentElement;
        const docHeight = Math.max(body.scrollHeight, body.offsetHeight, html.clientHeight, html.scrollHeight, html.offsetHeight);
        const windowBottom = windowHeight + window.pageYOffset + 10;
        
        if (windowBottom >= docHeight) {
           
        	this.state.page += 25;
	      	axios.get('/products?page='+this.state.page).then(response => {
	      	
	     	 this.setState({
	        products: [...this.state.products, ...response.data]
	      });
	    }) 

        } 
  }

  componentWillUnmount() {
    window.removeEventListener("scroll", this.handleScroll);
  }



	deleteUser(product) {

		//BackEnd delete
		var $this = this
		axios.delete(`/products/${product.id}/delete`).then(response => {
		//FroontEnd delete
		const newState = $this.state.products.slice();
		newState.splice(newState.indexOf(product), 1)
		$this.setState({
			products: newState
		})

		}).catch(error => {
			console.log(error)
		})

	}

	
	sortBy(key) {
	var dir = this.state.direction;

	this.state.products.forEach(function(entry) {
			
				if(entry.title === null)
				{
					entry.title = ''
				}
		});

		this.state.products =  this.state.products.sort(function(a, b) {


	if(key === 'title' || key === 'sku')
	{
		  var nameA = a[key].toString().toUpperCase(); 
		  var nameB = b[key].toString().toUpperCase();

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
	}
	else
	{
		if(dir === 'asc')
		{
			return a[key] - b[key];
		}
		else
		{
			return b[key] - a[key];
		}
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
			input: event.target.value,
		})
	}

	handleChangeSearch(event) {
		this.setState({
			query: event.target.value,
		})
	}

	GetSearchResults() {

	var str = this.state.query;
	var res = str.replace("+", "%2B");

    axios.get('/products/search?q='+res).then(response => {
	     	 this.setState({
	       products: response.data

	      });

	     }).catch(errors => {

       console.log(errors);
     })
    
  }


render() {
	const { products } = this.state


	let FilteredList = products.filter(word => {
			if(word.sku === null)
			{
				word.sku = ''
			}
			if(word.title === null)
			{
				word.title = ''
			}
			if(word.cost === null)
			{
				word.cost = ''
			}
			if(word.price === null)
			{
				word.price = ''
			}
			if(word.special_price === null)
			{
				word.special_price = ''
			}

			if(word.sku.toLowerCase().indexOf(this.state.input.toLowerCase()) !== -1)
			{
				return true;
			}			
			if(word.title.toLowerCase().indexOf(this.state.input.toLowerCase()) !== -1)
			{
				return true;
			}
			if(word.cost.toString().indexOf(this.state.input) !== -1)
			{
				return true;
			}
			if(word.price.toString().indexOf(this.state.input) !== -1)
			{
				return true;
			}
			if(word.special_price.toString().indexOf(this.state.input) !== -1)
			{
				return true;
			}
		});

	return(
<div className="container">
    <div className="row justify-content-center">
        <div className="col-md-20">
            <div className="card">
                <div className="card-header"><h1 align="center">Products</h1></div>
                <Link to={'create'} className="btn btn-primary">Add Product</Link>

                <div className="container">
                <div className="row align-items-center" style={{paddingTop: "15px"}}> 
                	<div className="col-md-auto align-self-end">
                		
                		<div className="input-group">
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
							   	 <button className="btn btn-primary" onClick={this.GetSearchResults}><span class="oi oi-magnifying-glass"></span></button>
			             	  	</div>
			            </div>

                	</div>
                		<div className="col-md-auto align-self-end">
                		<button className="btn pull-right btn-primary dropdown-toggle" type="button" data-toggle="dropdown">Filter</button>
   						  <ul className="dropdown-menu">
			            		<input id="myInput" placeholder="Filter..." value={this.state.input} onChange={this.handleChange} />
   						  </ul>
                		</div>
                	
                </div>
                </div>
                

                <div className="card-body">
                 	
					<table className="table"> 
						<thead>
						<tr>
							<th onClick={this.sortBy.bind(this, 'sku')}>Sku {this.state.name === 'sku' ? this.state.arrow : ''}</th>
							<th onClick={this.sortBy.bind(this, 'title')}>Title {this.state.name === 'title' ? this.state.arrow : ''}</th>
							<th onClick={this.sortBy.bind(this, 'cost')}>Cost {this.state.name === 'cost' ? this.state.arrow : ''}</th>
							<th onClick={this.sortBy.bind(this, 'price')}>Price {this.state.name === 'price' ? this.state.arrow : ''}</th>
							<th onClick={this.sortBy.bind(this, 'special_price')}>Special Price {this.state.name === 'special_price' ? this.state.arrow : ''}</th>
							</tr>
							
						</thead>
			<tbody>
							{FilteredList.map(product =>(
								<tr key={product.id}> 
								<td>{product.sku}</td>
								<td>{product.title}</td>
								<td>{product.cost}</td>
								<td>{product.price}</td>
								<td>{product.special_price}</td>
								<td><Link to={`/pproducts/${product.id}`} className='btn btn-info btn-sm' title="Edit"><span class="oi oi-wrench"></span></Link></td>
								<td><div className='btn btn-danger btn-sm' title="Delete" onClick={this.deleteUser.bind(this, product)}><span class="oi oi-trash"></span></div></td>
								</tr>
								))}
									
			</tbody>
                
						</table>
                
                </div>
            </div>
        </div>
    </div>
</div>
	);
}
}

export default ProductsList;
