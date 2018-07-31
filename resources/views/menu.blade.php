
    <li>
        @if(App\Order_Items::GetLastOrderId())
         <a href="/order/{{App\Order_Items::GetLastOrderId()}}/items/create" class="btn btn-success">+</a>
        @else
          <a href="/orders" class="btn btn-success">+</a>
        @endif
    </li>   
    <li>
         <a href="/ccustomers/list" class="btn btn-secondary">Customer</a>
    </li>    
    <li>
         <a href="/pproducts/list" class="btn btn-secondary">Products</a>
    </li> 
    <li>
         <a href="/ssuppliers/list" class="btn btn-secondary">Suppliers</a>
    </li> 
    <li>
         <a href="/oorders/list" class="btn btn-secondary">Orders</a>
    </li>         