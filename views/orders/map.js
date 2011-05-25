function(doc) {
  if (doc.created_at && doc.type && doc.type == 'order') {
    emit(doc.created_at, doc);
  }
};
