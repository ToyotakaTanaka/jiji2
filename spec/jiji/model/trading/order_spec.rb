# frozen_string_literal: true

require 'jiji/test/test_configuration'
require 'jiji/test/data_builder'

describe Jiji::Model::Trading::Order do
  describe '#carried_out?' do
    it '成行き注文の場合、常にtrue' do
      order = Jiji::Model::Trading::Order.new(:EURJPY, 1, :sell, :market, nil)

      expect(order.carried_out?(create_tick(100))).to be true
      expect(order.carried_out?(create_tick(101))).to be true
      expect(order.carried_out?(create_tick(99))).to be true
    end

    it '指値注文の場合、価格が既定値に達するとtrue' do
      order = Jiji::Model::Trading::Order.new(:EURJPY, 1, :sell, :limit, nil)
      order.price = 100

      expect(order.carried_out?(create_tick(100))).to be true
      expect(order.carried_out?(create_tick(101))).to be true
      expect(order.carried_out?(create_tick(99))).to be false

      order = Jiji::Model::Trading::Order.new(:EURJPY, 1, :buy, :limit, nil)
      order.price = 100.03

      expect(order.carried_out?(create_tick(100))).to be true
      expect(order.carried_out?(create_tick(101))).to be false
      expect(order.carried_out?(create_tick(99))).to be true
    end

    it '逆指値注文の場合、価格が既定値を下回るとtrue' do
      order = Jiji::Model::Trading::Order.new(:EURJPY, 1, :sell, :stop, nil)
      order.price = 100

      expect(order.carried_out?(create_tick(100))).to be true
      expect(order.carried_out?(create_tick(101))).to be false
      expect(order.carried_out?(create_tick(99))).to be true

      order = Jiji::Model::Trading::Order.new(:EURJPY, 1, :buy, :stop, nil)
      order.price = 100.03

      expect(order.carried_out?(create_tick(100))).to be true
      expect(order.carried_out?(create_tick(101))).to be true
      expect(order.carried_out?(create_tick(99))).to be false
    end

    it 'マーケットタッチの場合、価格が既定値に到達するとtrue' do
      order = Jiji::Model::Trading::Order.new(
        :EURJPY, 1, :sell, :marketIfTouched, nil)
      order.price = 100

      expect(order.carried_out?(create_tick(90))).to be false

      expect(order.carried_out?(create_tick(100))).to be true
      expect(order.carried_out?(create_tick(101))).to be true
      expect(order.carried_out?(create_tick(99))).to be false

      order = Jiji::Model::Trading::Order.new(
        :EURJPY, 1, :buy, :marketIfTouched, nil)
      order.price = 100.03

      expect(order.carried_out?(create_tick(110))).to be false

      expect(order.carried_out?(create_tick(100))).to be true
      expect(order.carried_out?(create_tick(101))).to be false
      expect(order.carried_out?(create_tick(99))).to be true
    end
  end

  it '#to_h, from_h' do
    order = Jiji::Model::Trading::Order.new(:EURJPY, 1, :sell, :market, nil)
    order.last_modified = Time.new(1000)
    order.units = 10_000
    order.price = 123
    order.time_in_force = "GTD"
    order.gtd_time = Time.new(2000)
    order.price_bound = 123.1
    order.position_fill = "OPEN_ONLY"
    order.client_extensions = {
      id: "clientId",
      tag: "clientTag",
      comment: "clientComment"
    },
    order.take_profit_on_fill = {
      price: 122.2,
      time_in_force: "GTD",
      gtd_time: Time.new(3000)
    },
    order.stop_loss_on_fill = {
      price: 125.5,
      time_in_force: "GTC",
      client_extensions: {
        id: "clientId2",
        tag: "clientTag",
        comment: "clientComment"
      },
    },
    order.trailing_stop_loss_on_fill = {
      distance: 10,
      time_in_force: "GTC",
      client_extensions: {
        id: "clientId3",
        tag: "clientTag",
        comment: "clientComment"
      }
    },
    order.trade_client_extensions = {
      id: "tradeClientId",
      tag: "tradeClientTag",
      comment: "tradeClientComment"
    }

    order2 = Jiji::Model::Trading::Order.new(:USDJPY, 2, :buy, :limit, nil)
    order2.from_h(order.to_h)
    expect(order).not_to be order2
    expect(order).to eq order2

    order.price_bound = 124.4
    expect(order).not_to be order2
    expect(order).not_to eq order2
  end

  def create_tick(price)
    Jiji::Model::Trading::Tick.new({
      EURJPY: Jiji::Model::Trading::Tick::Value.new(price, price + 0.03)
    }, Time.utc(2015, 5, 1, 0, 0, 0))
  end
end
