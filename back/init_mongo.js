db = connect('mongodb://localhost/miniProj');

db.data.insertMany([
  {
    request_id: 'tmp',
    request_headers: {
      'Content-Type': 'text',
      'host': 'some host',
    },
    request_body: {
      'id': 123421,
      'kind': 'test_content',
    },
  },
  {
    request_id: 'idtmp',
    request_headers: {
      'Content-Type': 'garbagetext',
      'host': 'another host',
    },
    request_body: {
      'id': 932820,
      'kind': 'different_content',
    },
  },
]);
