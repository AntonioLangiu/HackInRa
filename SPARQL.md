#Linked data
Le query che seguono si riferiscono allo SPARQL endpoint: http://dati.emilia-romagna.it/sparql

## Tutte le entità di Ravenna
select ?a ?title
where {
  ?a <http://www.geonames.org/ontology#locatedIn> <http://dati.emilia-romagna.it/id/ibc/place/ravenna> .
  ?a <http://purl.org/dc/elements/1.1/title> ?title
}

## Musei di Ravenna
select ?a ?title
where {
  ?a <http://www.geonames.org/ontology#locatedIn> <http://dati.emilia-romagna.it/id/ibc/place/ravenna> .
  ?a a <http://culturalis.org/cult/0.1#Museum> .
  ?a <http://purl.org/dc/elements/1.1/title> ?title
}
