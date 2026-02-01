package com.example.project.spring;

import org.springframework.stereotype.Service;
import java.util.*;
@Service
public class TaskService {
    private List<Task> tasks = new ArrayList<>();
    private long nextId = 1;
    public List<Task> getAllTasks() {
        return tasks;
    }
    public Task addTask(String title){
        Task task=new Task(nextId++, title);
        tasks.add(task);
        return task;
    }
    public void toggleTask(Long id){
        for(Task task:tasks){
            if(task.getId().equals(id)){
                task.setCompleted(!task.isCompleted());
                break;
            }
        }
    }
    public void editTask(Long id, String newTitle) {
        for (Task task : tasks) {
            if (task.getId().equals(id)) {
                task.setTitle(newTitle);
                break;
            }
        }
    }
    public void deleteTask(Long id) {
        tasks.removeIf(t -> t.getId().equals(id));
    }
}
