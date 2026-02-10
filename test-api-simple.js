const http = require('http');

function makeRequest(path) {
  return new Promise((resolve, reject) => {
    const req = http.get(`http://localhost:5000${path}`, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => {
        try {
          resolve(JSON.parse(data));
        } catch (e) {
          reject(e);
        }
      });
    });
      req.on('error', (err) => {
        reject(new Error(`Connection failed: ${err.message}`));
      });
      req.setTimeout(5000, () => {
        req.destroy();
        reject(new Error('Request timeout'));
      });
  });
}

async function testAPIs() {
  console.log('Testing Dashboard API...\n');

  try {
      console.log('Connecting to http://localhost:5000/api/dashboard/summary');
    const summary = await makeRequest('/api/dashboard/summary');
    console.log('✓ Dashboard Summary:', summary.data.today.revenue > 0 ? '✓ NON-ZERO' : '✗ ZERO');
    console.log('  Today Revenue:', summary.data.today.revenue);
    console.log('  Week Revenue:', summary.data.week.revenue);
    console.log('  Month Revenue:', summary.data.month.revenue);
    console.log('  Week Transactions:', summary.data.week.transactions);
  } catch (e) {
    console.error('✗ Dashboard Summary Error:', e.message);
  }

  try {
    const topItems = await makeRequest('/api/dashboard/top-items?period=weekly');
    console.log('\n✓ Top Items:', topItems.data.length > 0 ? '✓ FOUND' : '✗ EMPTY');
    if (topItems.data.length > 0) {
      console.log('  #1:', topItems.data[0].item_name, '- Qty:', topItems.data[0].total_quantity);
    }
  } catch (e) {
    console.error('✗ Top Items Error:', e.message);
  }

  try {
    const daily = await makeRequest('/api/reports/daily');
    console.log('\n✓ Daily Report:');
    console.log('  Total Revenue:', daily.data.data.summary.totalRevenue);
    console.log('  Transactions:', daily.data.data.summary.totalTransactions);
  } catch (e) {
    console.error('✗ Daily Report Error:', e.message);
  }

  try {
    const weekly = await makeRequest('/api/reports/weekly');
    console.log('\n✓ Weekly Report:');
    console.log('  Total Revenue:', weekly.data.data.summary.totalRevenue);
    console.log('  Transactions:', weekly.data.data.summary.totalTransactions);
  } catch (e) {
    console.error('✗ Weekly Report Error:', e.message);
  }

  try {
    const inventory = await makeRequest('/api/reports/inventory');
    console.log('\n✓ Inventory Report:');
    console.log('  Total Items:', inventory.data.data.summary.totalItems);
    console.log('  Total Value:', inventory.data.data.summary.totalValue);
  } catch (e) {
    console.error('✗ Inventory Report Error:', e.message);
  }

  console.log('\n✅ All endpoint tests completed!');
  process.exit(0);
}

testAPIs().catch(e => {
  console.error('Test failed:', e);
  process.exit(1);
});
