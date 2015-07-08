import TradingSummaryModel from "src/viewmodel/widgets/trading-summary-model"

describe("TradingSummaryModel", () => {

  var loader;
  var model;

  beforeEach(() => {
    model = new TradingSummaryModel({
      states:          {
        count:  10,
        exited: 8
      },
      winsAndLosses: {
        win:  4,
        lose: 4,
        draw: 2
      },
      sellOrBuy:     { sell: 6, buy: 4 },
      pairs:           {
        EURJPY: 6,
        USDJPY: 4
      },
      profitOrLoss:  {
        maxProfit:          1400,
        maxLoss:            -1200,
        avgProfit:          1200,
        avgLoss:            -1000,
        totalProfit:        5800,
        totalLoss:          -4000,
        totalProfitOrLoss:  1800,
        profitFactor:       1.2
      },
      holdingPeriod:  {
        maxPeriod: 200,
        minPeriod: 10,
        avgPeriod: 100
      },
      units:           {
        maxUnits: 1400,
        minUnits: 500,
        avgUnits: 980
      },
      agentSummary:   {
        a1 : {
          states: {
            count:  5,
            exited: 4
          },
          winsAndLosses: {
            win:  2,
            lose: 2,
            draw: 1
          },
          sellOrBuy: { sell: 3, buy: 2 },
          pairs: {
            EURJPY: 3,
            USDJPY: 2
          },
          profitOrLoss:  {
            maxProfit:          1400,
            maxLoss:            -1200,
            avgProfit:          1200,
            avgLoss:            -1000,
            totalProfit:        2400,
            totalLoss:          -2000,
            totalProfitOrLoss:   400,
            profitFactor:       1.2
          },
          holdingPeriod:  {
            maxPeriod: 200,
            minPeriod: 10,
            avgPeriod: 100
          },
          units:           {
            maxUnits: 1400,
            minUnits: 500,
            avgUnits: 980
          }
        },
        a2 : {
          states: {
            count:  5,
            exited: 4
          },
          winsAndLosses: {
            win:  2,
            lose: 2,
            draw: 1
          },
          sellOrBuy: { sell: 3, buy: 2 },
          pairs: {
            EURJPY: 3,
            USDJPY: 2
          },
          profitOrLoss:  {
            maxProfit:          1400,
            maxLoss:            -1200,
            avgProfit:          1200,
            avgLoss:            -1000,
            totalProfit:        2400,
            totalLoss:          -2000,
            totalProfitOrLoss:   400,
            profitFactor:       1.2
          },
          holdingPeriod:  {
            maxPeriod: 200,
            minPeriod: 10,
            avgPeriod: 100
          },
          units:           {
            maxUnits: 1400,
            minUnits: 500,
            avgUnits: 980
          }
        }
      }
    });
  });

  it("formatedProfitOrLoss", () => {
    expect(model.formatedProfitOrLoss).toEqual( "1,800" );
  });

  it("pairData", () => {
    expect(model.pairData).toEqual([{
      label: "EURJPY",
      value: 6,
      valueAndRatio: "6 (60.0%)",
      color: "#F7464A",
      highlight: "#FF5A5E"
    }, {
      label: "USDJPY",
      value: 4,
      valueAndRatio: "4 (40.0%)",
      color: "#46BFBD",
      highlight: "#5AD3D1"
    }]);
  });

  it("sellOrBuyData", () => {
    expect(model.sellOrBuyData).toEqual([{
      label: "買",
      color: "#F7464A",
      highlight: "#FF5A5E",
      value: 4,
      valueAndRatio: "4 (40.0%)"
    }, {
      label: "売",
      color: "#46BFBD",
      highlight: "#5AD3D1",
      value: 6,
      valueAndRatio: "6 (60.0%)"
    }]);
  });

  it("winsAndLossesData", () => {
    expect(model.winsAndLossesData).toEqual([{
      label: "勝",
      color: "#F7464A",
      highlight: "#FF5A5E",
      value: 4,
      valueAndRatio: "4 (40.0%)"
    }, {
      label: "負",
      color: "#46BFBD",
      highlight: "#5AD3D1",
      value: 4,
      valueAndRatio: "4 (40.0%)"
    }, {
      label: "引き分け",
      color: "#999",
      highlight: "#AAA",
      value: 2,
      valueAndRatio: "2 (20.0%)"
    }]);
  });

  it("formatedProfitFactor", () => {
    expect(model.formatedProfitFactor).toEqual( "1.200" );
  });

  it("agentSummary", () => {
    expect(model.agentSummary.a1.formatedProfitOrLoss).toEqual( "400" );
    expect(model.agentSummary.a2.formatedProfitOrLoss).toEqual( "400" );
  });
});