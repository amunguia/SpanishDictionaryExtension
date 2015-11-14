class Definition

  attr_reader :term, :definition, :pos

  def initialize(term, definition, pos)
    @term, @definition, @pos = term, definition, pos
  end

  def to_s
    "#{term}: #{definition} (#{pos})"
  end

  def to_json
    "{\"term\": \"#{term}\", \"definition\": \"#{definition}\", \"pos\": \"#{pos}\"}"
  end

end