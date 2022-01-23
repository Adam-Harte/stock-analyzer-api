import { Request, Response, NextFunction } from 'express';
import {
  getYahooFinanceSummaryData,
  getYahooFinanceAnalysisData,
  getYahooFinanceCashFlowData,
  getYahooFinanceBalanceSheetData,
  getYahooFinanceIncomeData,
  getBenjaminGrahamIntrinsicValue,
  getPeterLynchIntrinsicValue,
  getMetricBasedIntrinsicValue
} from '../utils/getData';

export const getStock = async (req: Request, res: Response, next: NextFunction) => {
  console.log(`getting stock using stock symbol ${req.params.symbol}`);
  const targetReturn = parseInt(`${req.query.targetReturn}`) || 10;
  const safetyMargin = parseInt(`${req.query.safetyMargin}`) || 10;

  const summaryData = await getYahooFinanceSummaryData(req.params.symbol);
  const analysisData = await getYahooFinanceAnalysisData(req.params.symbol);
  const cashFlowData = await getYahooFinanceCashFlowData(req.params.symbol);
  const balanceSheetData = await getYahooFinanceBalanceSheetData(req.params.symbol);
  const incomeData = await getYahooFinanceIncomeData(req.params.symbol);

  const intrinsicValue = getBenjaminGrahamIntrinsicValue(parseFloat(summaryData.eps), parseFloat(analysisData.growthRate));
  const returnDeduction = intrinsicValue - ((intrinsicValue / 100) * targetReturn);
  const safetyDeduction = returnDeduction - ((returnDeduction / 100) * safetyMargin);
  console.log(safetyDeduction);
  console.log(getPeterLynchIntrinsicValue(parseFloat(summaryData.eps), parseFloat(analysisData.growthRate)));
  console.log(getMetricBasedIntrinsicValue(parseFloat(summaryData.eps), parseFloat(analysisData.growthRate), parseFloat(summaryData.pe)));

  next();
};
