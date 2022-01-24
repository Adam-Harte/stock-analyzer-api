import axios from 'axios';
import cheerio from 'cheerio';

export const getYahooFinanceSummaryData = async (symbol: string) => {
  const { data } = await axios.get(`https://uk.finance.yahoo.com/quote/${symbol}`);
  const $ = cheerio.load(data);

  const tds = $('td', data);
  let eps: string | undefined;
  let pe: string | undefined;
  let marketCap: string | undefined;
  tds.each((i, e) => {
    eps = getEps($, e, eps);
    pe = getPe($, e, pe);
    marketCap = getMarketCap($, e, marketCap);
  });

  console.log('eps', eps);
  console.log('pe', pe);
  console.log('market cap', marketCap);

  return {
    eps: eps || '0.0',
    pe: pe ||'0.0',
    marketCap: marketCap || '0.0'
  };
};

export const getYahooFinanceAnalysisData = async (symbol: string) => {
  const { data } = await axios.get(`https://uk.finance.yahoo.com/quote/${symbol}/analysis`);
  const $ = cheerio.load(data);

  const tds = $('td', data);
  let growthRate: string | undefined;
  tds.each((i, e) => {
    growthRate = getGrowthRate($, e, growthRate);
  });

  console.log('growthRate', growthRate);

  return {
    growthRate: growthRate || '0.0'
  };
};

export const getYahooFinanceIncomeData = async (symbol: string) => {
  const { data } = await axios.get(`https://uk.finance.yahoo.com/quote/${symbol}/financials`);
  const $ = cheerio.load(data);

  const divs = $('div', data);
  let income: string | undefined;
  let revenue: string | undefined;
  let costOfRevenue: string | undefined;
  let operatingIncome: string | undefined;
  let ebitda: string | undefined;
  divs.each((i, e) => {
    income = getIncome($, e, income);

    revenue = getRevenue($, e, revenue);

    costOfRevenue = getCostOfRevenue($, e, costOfRevenue);

    operatingIncome = getOperatingIncome($, e, operatingIncome);

    ebitda = getEbitda($, e, ebitda);
  });

  console.log('income', income);
  console.log('revenue', revenue);
  console.log('costOfRevenue', costOfRevenue);
  console.log('operatingIncome', operatingIncome);
  console.log('ebitda', ebitda);

  return {
    income: income || '0.0',
    revenue: revenue || '0.0',
    costOfRevenue: costOfRevenue || '0.0',
    operatingIncome: operatingIncome || '0.0',
    ebitda: ebitda || '0.0'
  };
};

export const getYahooFinanceCashFlowData = async (symbol: string) => {
  const { data } = await axios.get(`https://uk.finance.yahoo.com/quote/${symbol}/cash-flow`);
  const $ = cheerio.load(data);

  const divs = $('div', data);
  let freeCashFlow: string | undefined;
  let operatingCashFlow: string | undefined;
  let capitalExpenditure: string | undefined;
  divs.each((i, e) => {
    freeCashFlow = getFreeCashFlow($, e, freeCashFlow);

    operatingCashFlow = getOperatingCashflow($, e, operatingCashFlow);

    capitalExpenditure = getCapitalExpenditure($, e, capitalExpenditure);
  });

  console.log('freeCashFlow', freeCashFlow);
  console.log('operatingCashFlow', operatingCashFlow);
  console.log('capitalExpenditure', capitalExpenditure);

  return {
    freeCashFlow: freeCashFlow || '0.0',
    operatingCashFlow: operatingCashFlow || '0.0',
    capitalExpenditure: capitalExpenditure || '0.0'
  };
};

export const getYahooFinanceBalanceSheetData = async (symbol: string) => {
  const { data } = await axios.get(`https://uk.finance.yahoo.com/quote/${symbol}/balance-sheet`);
  const $ = cheerio.load(data);

  const divs = $('div', data);
  let stockholdersEquity: string | undefined;
  let debt: string | undefined;
  let cash: string | undefined;
  let assets: string | undefined;
  let liabilities: string | undefined;
  divs.each((i, e) => {
    stockholdersEquity = getStockholdersEquity($, e, stockholdersEquity);

    debt = getDebt($, e, debt);

    cash = getCash($, e, cash);

    assets = getAssets($, e, assets);

    liabilities = getLiabilities($, e, liabilities);
  });

  console.log('stockholdersEquity', stockholdersEquity);
  console.log('debt', debt);
  console.log('cash', cash);
  console.log('assets', assets);
  console.log('liabilities', liabilities);

  return {
    stockholdersEquity: stockholdersEquity || '0.0',
    debt: debt || '0.0',
    cash: cash || '0.0',
    assets: assets || '0.0',
    liabilities: liabilities || '0.0'
  };
};

export const getWsjGrowthRatesData = async (symbol: string) => {
  const { data } = await axios.get(`https://www.wsj.com/market-data/quotes/${symbol}/company-people`);
  const $ = cheerio.load(data);

  const spans = $('span', data);
  let revenueGrowth: string | undefined;
  let incomeGrowth: string | undefined;
  let epsGrowth: string | undefined;
  let capitalSpendingGrowth: string | undefined;
  let grossMarginGrowth: string | undefined;
  let cashFlowGrowth: string | undefined;
  spans.each((i, e) => {
    revenueGrowth = getRevenueGrowth($, e, revenueGrowth);

    incomeGrowth = getIncomeGrowth($, e, incomeGrowth);

    epsGrowth = getEpsGrowth($, e, epsGrowth);

    capitalSpendingGrowth = getCapitalSpendingGrowth($, e, capitalSpendingGrowth);

    grossMarginGrowth = getGrossMarginGrowth($, e, grossMarginGrowth);

    cashFlowGrowth = getCashFlowGrowth($, e, cashFlowGrowth);
  });

  console.log('revenue growth', revenueGrowth);
  console.log('income growth', incomeGrowth);
  console.log('eps growth', epsGrowth);
  console.log('capital spending growth', capitalSpendingGrowth);
  console.log('gross margin growth', grossMarginGrowth);
  console.log('cash flow growth', cashFlowGrowth);

  return {
    revenueGrowth: revenueGrowth || '-',
    incomeGrowth: incomeGrowth || '-',
    epsGrowth: epsGrowth || '-',
    capitalSpendingGrowth: capitalSpendingGrowth || '-',
    grossMarginGrowth: grossMarginGrowth || '-',
    cashFlowGrowth: cashFlowGrowth || '-'
  };
};

export const getBenjaminGrahamIntrinsicValue = (eps: number, growthRate: number) => {
  const initialValue = eps * (8.5 + 2 * growthRate);
  return initialValue * 4.4 / 2.3;
};

export const getPeterLynchIntrinsicValue = (eps: number, growthRate: number) => {
  const initialValue = eps * (2 * growthRate);
  return initialValue;
};

export const getMetricBasedIntrinsicValue = (eps: number, growthRate: number, pe: number) => {
  const initialValue = eps * (1 + (growthRate / 100)) * pe;
  return initialValue;
};

function getCashFlowGrowth($: cheerio.Root, e: cheerio.Element, cashFlowGrowth: string | undefined) {
  if ($(e).text().trim() === 'Cash Flow') {
    cashFlowGrowth = $(e).next().text();
  }
  return cashFlowGrowth;
}

function getGrossMarginGrowth($: cheerio.Root, e: cheerio.Element, grossMarginGrowth: string | undefined) {
  if ($(e).text().trim() === 'Gross Margin') {
    grossMarginGrowth = $(e).next().text();
  }
  return grossMarginGrowth;
}

function getCapitalSpendingGrowth($: cheerio.Root, e: cheerio.Element, capitalSpendingGrowth: string | undefined) {
  if ($(e).text().trim() === 'Capital Spending') {
    capitalSpendingGrowth = $(e).next().text();
  }
  return capitalSpendingGrowth;
}

function getEpsGrowth($: cheerio.Root, e: cheerio.Element, epsGrowth: string | undefined) {
  if ($(e).text().trim() === 'Earnings Per Share') {
    epsGrowth = $(e).next().text();
  }
  return epsGrowth;
}

function getIncomeGrowth($: cheerio.Root, e: cheerio.Element, incomeGrowth: string | undefined) {
  if ($(e).text().trim() === 'Net Income') {
    incomeGrowth = $(e).next().text();
  }
  return incomeGrowth;
}

function getRevenueGrowth($: cheerio.Root, e: cheerio.Element, revenueGrowth: string | undefined) {
  if ($(e).text().trim() === 'Revenue') {
    revenueGrowth = $(e).next().text();
  }
  return revenueGrowth;
}

function getLiabilities($: cheerio.Root, e: cheerio.Element, liabilities: any) {
  if ($(e).attr('title') === "Total liabilities") {
    liabilities = $(e).parent().next().text();
  }
  return liabilities;
}

function getAssets($: cheerio.Root, e: cheerio.Element, assets: any) {
  if ($(e).attr('title') === "Total current assets") {
    assets = $(e).parent().next().text();
  }
  return assets;
}

function getCash($: cheerio.Root, e: cheerio.Element, cash: any) {
  if ($(e).attr('title') === "Cash and cash equivalents") {
    cash = $(e).parent().next().text();
  }
  return cash;
}

function getDebt($: cheerio.Root, e: cheerio.Element, debt: any) {
  if ($(e).attr('title') === "Current debt") {
    debt = $(e).parent().next().text();
  }
  return debt;
}

function getStockholdersEquity($: cheerio.Root, e: cheerio.Element, stockholdersEquity: any) {
  if ($(e).attr('title') === "Total stockholders' equity") {
    stockholdersEquity = $(e).parent().next().text();
  }
  return stockholdersEquity;
}

function getCapitalExpenditure($: cheerio.Root, e: cheerio.Element, capitalExpenditure: any) {
  if ($(e).attr('title') === "Capital expenditure") {
    capitalExpenditure = $(e).parent().next().text();
  }
  return capitalExpenditure;
}

function getOperatingCashflow($: cheerio.Root, e: cheerio.Element, operatingCashFlow: any) {
  if ($(e).attr('title') === "Operating cash flow") {
    operatingCashFlow = $(e).parent().next().text();
  }
  return operatingCashFlow;
}

function getFreeCashFlow($: cheerio.Root, e: cheerio.Element, freeCashFlow: any) {
  if ($(e).attr('title') === "Free cash flow") {
    freeCashFlow = $(e).parent().next().text();
  }
  return freeCashFlow;
}

function getEbitda($: cheerio.Root, e: cheerio.Element, ebitda: any) {
  if ($(e).attr('title') === "EBITDA") {
    ebitda = $(e).parent().next().text();
  }
  return ebitda;
}

function getOperatingIncome($: cheerio.Root, e: cheerio.Element, operatingIncome: any) {
  if ($(e).attr('title') === "Operating income or loss") {
    operatingIncome = $(e).parent().next().text();
  }
  return operatingIncome;
}

function getCostOfRevenue($: cheerio.Root, e: cheerio.Element, costOfRevenue: any) {
  if ($(e).attr('title') === "Cost of revenue") {
    costOfRevenue = $(e).parent().next().text();
  }
  return costOfRevenue;
}

function getRevenue($: cheerio.Root, e: cheerio.Element, revenue: any) {
  if ($(e).attr('title') === "Total revenue") {
    revenue = $(e).parent().next().text();
  }
  return revenue;
}

function getIncome($: cheerio.Root, e: cheerio.Element, income: any) {
  if ($(e).attr('title') === "Net income") {
    income = $(e).parent().next().text();
  }
  return income;
}

function getGrowthRate($: cheerio.Root, e: cheerio.Element, growthRate: any) {
  if ($(e).text().trim() === "Next 5 years (per annum)") {
    growthRate = $(e).next().text();
  }
  return growthRate;
}

function getPe($: cheerio.Root, e: cheerio.Element, pe: any) {
  if ($(e).attr('data-test') === "PE_RATIO-value") {
    pe = $(e).text();
  }
  return pe;
}

function getMarketCap($: cheerio.Root, e: cheerio.Element, marketCap: any) {
  if ($(e).attr('data-test') === "MARKET_CAP-value") {
    marketCap = $(e).text();
  }
  return marketCap;
}

function getEps($: cheerio.Root, e: cheerio.Element, eps: any) {
  if ($(e).attr('data-test') === "EPS_RATIO-value") {
    eps = $(e).text();
  }
  return eps;
}

