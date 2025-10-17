# Untitled

1. _renderMedEventList hook up the event listerner 

```
	$expandableEventItems.on('click', function(event) {
		var eventMetadata = view._getMedEventMetadata(event);
		view._renderPrescriptionDocumentOrFillEvent(eventMetadata);
		view._renderDataReconcileSourceDocument(eventMetadata);
		view._selectPoint(event, eventMetadata);
	});

```