import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, FlatList, StyleSheet, TouchableOpacity } from 'react-native';

const App = () => {
  const [todos, setTodos] = useState([]);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [editingId, setEditingId] = useState(null);
  const [completedCount, setCompletedCount] = useState(0);
  const [incompleteCount, setIncompleteCount] = useState(0);

  useEffect(() => {
    const completed = todos.filter(todo => todo.completed).length;
    const incomplete = todos.length - completed;
    setCompletedCount(completed);
    setIncompleteCount(incomplete);
  }, [todos]);

  const addTodo = () => {
    if (editingId !== null) {
      setTodos(todos.map(todo => 
        todo.id === editingId 
        ? { ...todo, title, content } 
        : todo
      ));
      setEditingId(null);
    } else {
      setTodos([...todos, { id: Date.now(), title, content, completed: false }]);
    }
    setTitle('');
    setContent('');
  };

  const editTodo = (id) => {
    const todo = todos.find(todo => todo.id === id);
    setTitle(todo.title);
    setContent(todo.content);
    setEditingId(id);
  };

  const deleteTodo = (id) => {
    setTodos(todos.filter(todo => todo.id !== id));
  };

  const toggleComplete = (id) => {
    setTodos(todos.map(todo => 
      todo.id === id 
      ? { ...todo, completed: !todo.completed } 
      : todo
    ));
  };

  const renderTodo = ({ item }) => (
    <View style={styles.todo}>
      <Text style={styles.todoTitle}>{item.title}</Text>
      <Text>{item.content}</Text>
      <View style={styles.todoActions}>
        <Button title={item.completed ? "Chua"  :"HoanThanh"} onPress={() => toggleComplete(item.id)} />
        <Button title="Update" onPress={() => editTodo(item.id)} />
        <Button title="Delete" onPress={() => deleteTodo(item.id)} />
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Quản lý danh sách công việc</Text>
      <Text style={styles.count}>Hoàn thành: {completedCount}         |                 Chưa hoàn thiện: {incompleteCount}</Text>
      <TextInput
        placeholder="Title"
        value={title}
        onChangeText={setTitle}
        style={styles.input}
      />
      <TextInput
        placeholder="Content"
        value={content}
        onChangeText={setContent}
        style={styles.input}
      />
      <Button title={editingId !== null ? "Update job" : "Add job"} onPress={addTodo} />
      <FlatList
        data={todos}
        renderItem={renderTodo}
        keyExtractor={item => item.id.toString()}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  count: {
    fontSize: 16,
    marginBottom: 10,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 10,
    paddingHorizontal: 10,
  },
  todo: {
    padding: 10,
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 5,
    marginBottom: 10,
  },
  todoTitle: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  todoActions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
  },
});

export default App;