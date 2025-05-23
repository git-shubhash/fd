// Initialize Web3 and contract
App = {
    web3Provider: null,
    contracts: {},

    init: async function() {
        return await App.initWeb3();
    },

    initWeb3: function() {
        if(window.web3) {
            App.web3Provider = window.web3.currentProvider;
        } else {
            App.web3Provider = new Web3.providers.HttpProvider('http://localhost:7545');
        }
        web3 = new Web3(App.web3Provider);
        return App.initContract();
    },

    initContract: function() {
        $.getJSON('product.json', function(data) {
            var productArtifact = data;
            App.contracts.product = TruffleContract(productArtifact);
            App.contracts.product.setProvider(App.web3Provider);
            return App.loadDashboardData();
        });
    },

    loadDashboardData: function() {
        let productInstance;
        web3.eth.getAccounts(function(error, accounts) {
            if(error) {
                console.log(error);
                return;
            }

            const account = accounts[0];
            
            App.contracts.product.deployed().then(function(instance) {
                productInstance = instance;
                return productInstance.productCount();
            }).then(function(count) {
                document.getElementById('totalProducts').textContent = count.toString();
                return productInstance.sellerCount();
            }).then(function(count) {
                document.getElementById('activeSellers').textContent = count.toString();
                // Add more dashboard data loading here
            }).catch(function(err) {
                console.log(err.message);
            });
        });
    }
};

// Initialize the dashboard when the page loads
$(function() {
    $(window).load(function() {
        App.init();
    });
});