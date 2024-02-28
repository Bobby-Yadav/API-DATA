const apiModelData = require('../models/apidata');
 


module.exports.apiReqData = async(req,res)=>{
    try {
        const response = await fetch('https://s3.amazonaws.com/roxiler.com/product_transaction.json');
        const data = await response.json();
         
        for(let i=0; i<data.length;i++){
            const dbData = new apiModelData({
                id:data[i]['id'],
                title:data[i]['title'],
                price:data[i]['price'],
                description:data[i]['description'],  
                category:data[i]['category'], 
                image:data[i]['image'],
                sold:data[i]['sold'],
                dateOfSale:data[i]['dateOfSale'],
            });
            dbData.save()
        };
        
        const dd = await apiModelData.find({});
        res.status(200).render("apiDataView",{mdata:dd})
       
      
     } catch (error) {
        console.error('Error fetching data:', error.message);
       res.status(500).send('Error fetching data');
     }

}

// module.exports.dbdata = (req,res)=>{
//     apiModelData.find({},function(dd){
//         res.render("apiDataView",{data:dd})
//         console.log(dd)
//     })
// }

module.exports.searchTransactions = (req,res,next)=>{

        

     
        let transactions = apiModelData.find({});
         
        console.log( )
         
       const page = 1
       const perPage = 10
        
     
        const {search } = req.body;
      
        // Apply pagination
        const startIndex = (page - 1) * perPage;
        const endIndex = startIndex + perPage;
        const paginatedTransactions = transactions.slice(startIndex, endIndex);
      
        // Apply search filter if search parameter is provided
        let filteredTransactions = paginatedTransactions;
        if (search) {
          const searchText = search.toLowerCase();
          filteredTransactions = transactions.filter(transaction => {
            return (
              transaction.title.toLowerCase().includes(searchText) ||
              transaction.description.toLowerCase().includes(searchText) ||
              transaction.price.toString().includes(searchText)
            );
          });
        }
        

        const data={
          totalTransactions: transactions.length,
          currentPage: page,
          perPage: perPage,
          transactions: filteredTransactions
        };

        res.render("transaction",{data:data})

}

module.exports.barData = (req,res)=>{



     




    const { month } = req.body;
    const transactions   = req.body
    const filteredTransactions = transactions.filter(transaction => transaction.month === month);

  // Initialize an object to store the count for each price range
  const priceRangeCount = {
    '0 - 100': 0,
    '101 - 200': 0,
    '201 - 300': 0,
    '301 - 400': 0,
    '401 - 500': 0,
    '501 - 600': 0,
    '601 - 700': 0,
    '701 - 800': 0,
    '801 - 900': 0,
    '901 - above': 0
  };

  // Calculate the count for each price range
  filteredTransactions.forEach(transaction => {
    const range = getPriceRange(transaction.price);
    priceRangeCount[range]++;
  });

  res.json(priceRangeCount);



    console.log(apiModelData)
    res.send("your data has graph")

}

const getPriceRange = (price) => {
    if (price >= 0 && price <= 100) return '0 - 100';
    else if (price >= 101 && price <= 200) return '101 - 200';
    else if (price >= 201 && price <= 300) return '201 - 300';
    else if (price >= 301 && price <= 400) return '301 - 400';
    else if (price >= 401 && price <= 500) return '401 - 500';
    else if (price >= 501 && price <= 600) return '501 - 600';
    else if (price >= 601 && price <= 700) return '601 - 700';
    else if (price >= 701 && price <= 800) return '701 - 800';
    else if (price >= 801 && price <= 900) return '801 - 900';
    else return '901 - above';
  };