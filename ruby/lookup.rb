def lookup(word)
  begin
    page = Nokogiri::HTML(open("http://www.spanishcentral.com/translate/#{word}"))
    result = []
    page.css("div.short-def").each do |meaning|
      defintion = Definition.new(meaning.css(".main").text, meaning.css(".def").text, meaning.css("em").text)
      result << defintion.to_json
    end
    "[#{result.join(", ")}]" 
  rescue
    "{\"error\": \"Could not find #{word}\"}"
  end
end
