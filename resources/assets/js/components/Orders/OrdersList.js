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
      Status: [],
      message: '',
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

		var fields = ["order_no"];
		var str = this.state.query;
		var res = str.replace("+", "%2B");

    axios.get('/orders/search?q='+res+'&fields='+fields).then(response => {
	      	
	     	 this.setState({
	       orders: response.data

	      });
	     
	     }).catch(errors => {

       console.log(errors);
     })
  }

retrieveDataAsynchronously(searchText){
       
       var fields = ["order_no"];

        axios.get('/orders/search?q='+searchText+'&fields='+fields).then(response => {
 
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
		var ask = window.confirm("Ar tikrai norite ištrinti įrašą?");
		if(ask)
		{
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
				if(word.status == "0")
				{
					word.status = "N"

				}
				else if(word.status == "1")
				{
					word.status = "S"
				}
				else if(word.status == "2")
				{
					word.status = "C"
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

	// Alert on Adding
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
                <div className="card-header"><h1 align="center">Orders</h1></div>

                {Alert}

                <Link to={'create'} className="btn btn-primary">Add Order</Link>

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
							<th onClick={this.sortBy.bind(this, 'order_no')}>Order No {this.state.name === 'order_no' ? this.state.arrow : ''}</th>
							<th onClick={this.sortBy.bind(this, 'status')}>Status {this.state.name === 'status' ? this.state.arrow : ''}</th>
							<th onClick={this.sortBy.bind(this, 'supplier')}>Supplier {this.state.name === 'supplier' ? this.state.arrow : ''}</th>
							<th></th>
							<th></th>
							<th></th>
							<th></th>
						</tr>														
						</thead>
			<tbody>							
							{FilteredList.map(order =>(
								<tr key={order.id}> 
								<td>{order.order_no}</td>
								<td title={order.status === "N" ? "Not Sent" : order.status === "S" ? "Sent Current to Open" : "Closed"} className={order.status === "N" ? "text-primary" : order.status === "S" ? "text-warning" : "text-success"}>
								<b><span className="d-block d-sm-none">{order.status}</span><span className="Full">{order.status === "N" ? "Not Sent" : order.status === "S" ? "Sent Current to Open" : order.status === "C" ? "Closed" : ""}</span></b></td>
								<td>{order.supplier}</td>
								<td><Link to={`/oorders/${order.id}`} className='btn btn-info btn-sm' title="Edit"><span className="oi oi-wrench"></span></Link></td>
								<td><Link to={`/oorder/${order.id}/create`} className='btn btn-success btn-sm' title="Add Items"><span className="oi oi-plus"></span></Link></td>
								<td><Link to={`/oorder/${order.id}/items`} className='btn btn-primary btn-sm' title="Show List"><span className="oi oi-list"></span></Link></td>
								<td><div className='btn btn-danger btn-sm' title="Delete" onClick={this.deleteUser.bind(this, order)}><span className="oi oi-trash"></span></div></td>
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
export default OrdersList;

