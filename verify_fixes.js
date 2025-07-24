const fs = require('fs');

console.log('🔍 VERIFYING FINANCIAL PLANNER FIXES...\n');

try {
    const htmlContent = fs.readFileSync('financial_planner_COMPLETE_LAYOUT_FIXED.html', 'utf8');
    
    // Test 1: Risk Profile Allocations Synchronization
    console.log('1️⃣ TESTING: Risk Profile Allocations Synchronization');
    
    // Check Conservative allocation in risk assessment
    const conservativeRiskMatch = htmlContent.match(/if \(riskPercentage <= 30\)[\s\S]*?portfolioRecommendation = \{[\s\S]*?equity: 20,[\s\S]*?debt: 60,[\s\S]*?gold: 10,[\s\S]*?cash: 10[\s\S]*?\}/);
    
    // Check Conservative allocation in investment recommendations  
    const conservativeInvestmentMatches = (htmlContent.match(/'Conservative': \{ equity: 20, debt: 60, gold: 10, cash: 10 \}/g) || []).length;
    
    if (conservativeRiskMatch && conservativeInvestmentMatches >= 5) {
        console.log('   ✅ PASS: Conservative allocations synchronized (20/60/10/10)');
        console.log(`   📊 Found ${conservativeInvestmentMatches} matching allocations in investment sections`);
    } else {
        console.log('   ❌ FAIL: Conservative allocations not synchronized');
        console.log(`   📊 Risk assessment match: ${!!conservativeRiskMatch}`);
        console.log(`   📊 Investment matches: ${conservativeInvestmentMatches}`);
    }
    
    // Test 2: Inflation Field
    console.log('\n2️⃣ TESTING: Portfolio Analysis Inflation Field');
    
    const inflationFieldMatch = htmlContent.match(/id="inflation-rate".*?value="6"/);
    const inflationUsageMatch = htmlContent.match(/getElementById\('inflation-rate'\)\.value/g);
    
    if (inflationFieldMatch && inflationUsageMatch && inflationUsageMatch.length >= 3) {
        console.log('   ✅ PASS: Inflation field exists with default value 6');
        console.log(`   📊 Found ${inflationUsageMatch.length} places using inflation rate`);
    } else {
        console.log('   ❌ FAIL: Inflation field issues');
        console.log(`   📊 Field exists: ${!!inflationFieldMatch}`);
        console.log(`   📊 Usage count: ${inflationUsageMatch ? inflationUsageMatch.length : 0}`);
    }
    
    // Test 3: Real vs Nominal Returns
    console.log('\n3️⃣ TESTING: Inflation-Adjusted (Real) Returns Display');
    
    const realReturnsMatch = htmlContent.match(/Real: ₹\$\{Math\.round\(realReturns\)\.toLocaleString/);
    const realCAGRMatch = htmlContent.match(/Real: \$\{realCAGR\.toFixed\(2\)\}%/);
    
    if (realReturnsMatch && realCAGRMatch) {
        console.log('   ✅ PASS: Real vs Nominal returns display implemented');
    } else {
        console.log('   ❌ FAIL: Real returns display missing');
        console.log(`   📊 Real returns: ${!!realReturnsMatch}`);
        console.log(`   📊 Real CAGR: ${!!realCAGRMatch}`);
    }
    
    // Test 4: Investment Strategy Personalization
    console.log('\n4️⃣ TESTING: Investment Strategy Personalization');
    
    const personalizedStrategyMatch = htmlContent.match(/getInvestmentGuidance\(riskProfile\.riskCategory\)/);
    const actionItemsMatch = htmlContent.match(/getActionItems\(riskProfile\.riskCategory\)/);
    
    if (personalizedStrategyMatch && actionItemsMatch) {
        console.log('   ✅ PASS: Investment strategy now personalized by risk profile');
    } else {
        console.log('   ❌ FAIL: Investment strategy still generic');
        console.log(`   📊 Guidance function: ${!!personalizedStrategyMatch}`);
        console.log(`   📊 Action items function: ${!!actionItemsMatch}`);
    }
    
    // Test 5: Auto-refresh functionality
    console.log('\n5️⃣ TESTING: Auto-refresh Investment Recommendations');
    
    const autoRefreshMatch = htmlContent.match(/\/\/ Refresh Investment Recommendations with new risk profile[\s\S]*?loadInvestmentRecommendations\(\);/);
    
    if (autoRefreshMatch) {
        console.log('   ✅ PASS: Auto-refresh after risk assessment implemented');
    } else {
        console.log('   ❌ FAIL: Auto-refresh missing');
    }
    
    // Summary
    console.log('\n📋 SUMMARY:');
    const tests = [
        conservativeRiskMatch && conservativeInvestmentMatches >= 5,
        inflationFieldMatch && inflationUsageMatch && inflationUsageMatch.length >= 3,
        realReturnsMatch && realCAGRMatch,
        personalizedStrategyMatch && actionItemsMatch,
        autoRefreshMatch
    ];
    
    const passCount = tests.filter(Boolean).length;
    const totalTests = tests.length;
    
    console.log(`   ${passCount}/${totalTests} tests passed`);
    
    if (passCount === totalTests) {
        console.log('   🎉 ALL FIXES VERIFIED - App should be working correctly!');
    } else {
        console.log('   ⚠️  Some issues detected - may need additional fixes');
    }
    
} catch (error) {
    console.log('❌ ERROR: Could not read the HTML file');
    console.log(error.message);
}