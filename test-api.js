const axios = require('axios');

const API_URL = 'http://localhost:5000/api';

async function testDashboard() {
  console.log('\n=== Testing Dashboard API ===\n');

  try {
    // Test Summary
    console.log('1. Testing /dashboard/summary...');
    const summaryRes = await axios.get(`${API_URL}/dashboard/summary`);
    console.log('✓ Summary endpoint working');
    console.log('  Today Revenue:', summaryRes.data.data.today.revenue);
    console.log('  Week Revenue:', summaryRes.data.data.week.revenue);
    console.log('  Month Revenue:', summaryRes.data.data.month.revenue);
    console.log('  Today Transactions:', summaryRes.data.data.today.transactions);

    // Test Top Items
    console.log('\n2. Testing /dashboard/top-items...');
    const topItemsRes = await axios.get(`${API_URL}/dashboard/top-items?period=weekly`);
    console.log('✓ Top items endpoint working');
    console.log('  Top items found:', topItemsRes.data.data.length);
    if (topItemsRes.data.data.length > 0) {
      console.log('  #1:', topItemsRes.data.data[0].item_name, '- Qty:', topItemsRes.data.data[0].total_quantity);
    }

    // Test Sales Trend
    console.log('\n3. Testing /dashboard/sales-trend...');
    const trendRes = await axios.get(`${API_URL}/dashboard/sales-trend?days=7`);
    console.log('✓ Sales trend endpoint working');
    console.log('  Days returned:', trendRes.data.data.length);

    // Test Revenue by Category
    console.log('\n4. Testing /dashboard/revenue-by-category...');
    const categoryRes = await axios.get(`${API_URL}/dashboard/revenue-by-category?period=weekly`);
    console.log('✓ Revenue by category endpoint working');
    console.log('  Categories found:', categoryRes.data.data.length);

  } catch (error) {
    console.error('❌ Error:', error.message);
  }
}

async function testReports() {
  console.log('\n=== Testing Reports API ===\n');

  try {
    // Test Daily Report
    console.log('1. Testing /reports/daily...');
    const today = new Date().toISOString().split('T')[0];
    const dailyRes = await axios.get(`${API_URL}/reports/daily?date=${today}`);
    console.log('✓ Daily report endpoint working');
    console.log('  Total Revenue:', dailyRes.data.data.summary.totalRevenue);
    console.log('  Total Transactions:', dailyRes.data.data.summary.totalTransactions);

    // Test Weekly Report
    console.log('\n2. Testing /reports/weekly...');
    const weeklyRes = await axios.get(`${API_URL}/reports/weekly`);
    console.log('✓ Weekly report endpoint working');
    console.log('  Total Revenue:', weeklyRes.data.data.summary.totalRevenue);
    console.log('  Total Transactions:', weeklyRes.data.data.summary.totalTransactions);

    // Test Monthly Report
    console.log('\n3. Testing /reports/monthly...');
    const monthlyRes = await axios.get(`${API_URL}/reports/monthly`);
    console.log('✓ Monthly report endpoint working');
    console.log('  Total Revenue:', monthlyRes.data.data.summary.totalRevenue);
    console.log('  Total Transactions:', monthlyRes.data.data.summary.totalTransactions);

    // Test Inventory Report
    console.log('\n4. Testing /reports/inventory...');
    const inventoryRes = await axios.get(`${API_URL}/reports/inventory`);
    console.log('✓ Inventory report endpoint working');
    console.log('  Total Items:', inventoryRes.data.data.summary.totalItems);
    console.log('  Total Value:', inventoryRes.data.data.summary.totalValue);
    console.log('  Low Stock Items:', inventoryRes.data.data.summary.lowStockCount);

  } catch (error) {
    console.error('❌ Error:', error.message);
  }
}

async function runTests() {
  console.log('🧪 Testing Print Shop API...');
  await testDashboard();
  await testReports();
  console.log('\n✅ All tests completed!');
  process.exit(0);
}

runTests().catch(error => {
  console.error('Test failed:', error);
  process.exit(1);
});
