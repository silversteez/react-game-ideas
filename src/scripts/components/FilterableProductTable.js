var React = require('react/addons');

var ProductCategoryRow = React.createClass({
  render: function() {
    return (<tr><th colSpan="2">{this.props.category}</th></tr>);
  }
});

var ProductRow = React.createClass({
  render: function() {
    var name = this.props.product.stocked ?
      this.props.product.name :
      <span style={{color: 'red'}}>
        {this.props.product.name}
      </span>;
    return (
      <tr>
        <td>{name}</td>
        <td>{this.props.product.price}</td>
      </tr>
    );
  }
});

var ProductTable = React.createClass({
  render: function() {
    var rows = [];
    var lastCategory = null;
    var props = this.props;
    this.props.products.forEach(function(product) {

      if (product.category !== lastCategory) {
        rows.push(<ProductCategoryRow category={product.category} key={product.category} />);
      }

      var filteredViaText = (product.name.indexOf(props.filterText) === -1);
      var filteredViaInStockOnly = (props.inStockOnly && !product.stocked);
      if (!filteredViaText && !filteredViaInStockOnly) {
        rows.push(<ProductRow product={product} key={product.name} />);
      }

      lastCategory = product.category;
    });
    return (
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Price</th>
          </tr>
        </thead>
        <tbody>{rows}</tbody>
      </table>
    );
  }
});

var SearchBar = React.createClass({
  onInputChange: function(e) {
    this.props.onUserInput({filterText:e.target.value});
  },
  onCheckboxChange:function(e) {
    this.props.onUserInput({inStockOnly:e.target.checked});
  },
  render: function() {
    return (
      <form>
        <input type="text" placeholder="Search..." onChange={this.onInputChange}/>
        <p>
          <input type="checkbox" onChange={this.onCheckboxChange}/>
                    {' '}
          Only show products in stock
        </p>
      </form>
    );
  }
});

var PRODUCTS = [
  {category: 'Sporting Goods', price: '$49.99', stocked: true, name: 'Football'},
  {category: 'Sporting Goods', price: '$9.99', stocked: true, name: 'Baseball'},
  {category: 'Sporting Goods', price: '$29.99', stocked: false, name: 'Basketball'},
  {category: 'Electronics', price: '$99.99', stocked: true, name: 'iPod Touch'},
  {category: 'Electronics', price: '$399.99', stocked: false, name: 'iPhone 5'},
  {category: 'Electronics', price: '$199.99', stocked: true, name: 'Nexus 7'}
];

var FilterableProductTable = React.createClass({
  getInitialState: function() {
    return {
      filterText: '',
      inStockOnly: false
    };
  },
  handleUserInput: function(changeObj) {
    this.setState(changeObj);
  },
  render: function() {
    return (
      <div>
        <SearchBar
          filterText={this.state.filterText}
          inStockOnly={this.state.inStockOnly}
          onUserInput={this.handleUserInput}
        />
        <ProductTable
          products={PRODUCTS}
          filterText={this.state.filterText}
          inStockOnly={this.state.inStockOnly}
        />
      </div>
    );
  }
});

module.exports = FilterableProductTable;
