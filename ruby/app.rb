require 'open-uri'
require 'sinatra'
require 'nokogiri'

require './definition.rb'
require './lookup.rb'

get "/translate/:word" do 
  lookup(params['word'])
end