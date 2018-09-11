import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios'
import Autocomplete from 'react-autocomplete';
import { Link } from 'react-router-dom';


class OrdersList extends Component {
constructor () {
    super()

    this.state = {
      orders: [],
      direction: 'asc',
      arrow: '↑',
      name: '',
      temp: [],
      input: '',
      page: 0,
      query: '',
      autocompleteData: [],
      height: window.innerHeight
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
    axios.get('/orders').then(response => {
      this.setState({
        orders: response.data
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
	      	axios.get('/orders?page='+this.state.page).then(response => {
	      	
	     	 this.setState({
	        orders: [...this.state.orders, ...response.data]
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

		var str = this.state.query;
		var res = str.replace("+", "%2B");

    axios.get('/orders/search?q='+res).then(response => {
	      	
	     	 this.setState({
	       orders: response.data

	      });
	     
	     }).catch(errors => {

       console.log(errors);
     })
  }

retrieveDataAsynchronously(searchText){
       

        axios.get('/orders/search?q='+searchText).then(response => {
 
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
                {item.order_no}
            </div>   
        ); 
    }

    
    getItemValue(item){
        
        return `${item.order_no}`;
    }



   			 //Autocomplete
//----------------------------------------------

	deleteUser(order) {

		//BackEnd delete
		var $this = this
		axios.delete(`/orders/${order.id}/delete`).then(response => {
		//FroontEnd delete
		const newState = $this.state.orders.slice();
		newState.splice(newState.indexOf(order), 1)
		$this.setState({
			orders: newState
		})

		}).catch(error => {
			console.log(error)
		})
	}

	sortBy(key) {
	var dir = this.state.direction;

		this.state.orders.forEach(function(entry) {
			
				if(entry.status === null)
				{
					entry.status = ''
				}
				if(entry.supplier === null)
				{
					entry.supplier = ''
				}			
		});

		this.state.orders =  this.state.orders.sort(function(a, b) {
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
			input: event.target.value,
		})
	}

render() {
	const { orders } = this.state

	let FilteredList = orders.filter(word => {

			if(word.status === null)
				{
					word.status = ''
				}
				if(word.supplier === null)
				{
					word.supplier = ''
				}	

			if(word.order_no.toLowerCase().indexOf(this.state.input.toLowerCase()) !== -1)
			{
				return true;
			}
			if(word.status.toLowerCase().indexOf(this.state.input.toLowerCase()) !== -1)
			{
				return true;
			}
			if(word.supplier.toLowerCase().indexOf(this.state.input.toLowerCase()) !== -1)
			{
				return true;
			}

		});



	return(
<div className="container">
    <div className="row justify-content-center">
        <div className="col-md-20">
            <div className="card">
                <div className="card-header"><h1 align="center">Orders</h1></div>
                <Link to={'create'} className="btn btn-primary">Add Order</Link>

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
							<th onClick={this.sortBy.bind(this, 'order_no')}>Order No {this.state.name === 'order_no' ? this.state.arrow : ''}</th>
							<th onClick={this.sortBy.bind(this, 'status')}>Status {this.state.name === 'status' ? this.state.arrow : ''}</th>
							<th onClick={this.sortBy.bind(this, 'supplier')}>Supplier {this.state.name === 'supplier' ? this.state.arrow : ''}</th>
						</tr>
						
														
						</thead>
			<tbody>							
							{FilteredList.map(order =>(
								<tr key={order.id}> 
								<td>{order.order_no}</td>
								<td>{order.status}</td>
								<td>{order.supplier}</td>
								<td></td>
								<td><Link to={`/oorders/${order.id}`} className='btn btn-info btn-sm' title="Edit"><span class="oi oi-wrench"></span></Link></td>
								<td><Link to={`/oorder/${order.id}/create`} className='btn btn-success btn-sm' title="Add Items"><span class="oi oi-plus"></span></Link></td>
								<td><Link to={`/oorder/${order.id}/items`} className='btn btn-primary btn-sm' title="Show List"><span class="oi oi-list"></span></Link></td>
								<td><div className='btn btn-danger btn-sm' title="Delete" onClick={this.deleteUser.bind(this, order)}><span class="oi oi-trash"></span></div></td>
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
export default OrdersList;

