package com.example.project.spring;

import org.springframework.web.bind.annotation.*;
import java.util.*;
@RestController
@RequestMapping("/api/tasks")
@CrossOrigin(origins = "http://localhost:5173")
public class TaskController {
    private TaskService taskService;
    public TaskController(TaskService taskService){
        this.taskService=taskService;
    }
    @GetMapping
    public List<Task> getTasks(){
        return taskService.getAllTasks();
    }
    @PostMapping
    public Task addTask(@RequestBody Task task){
        return taskService.addTask(task.getTitle());
    }
    @PutMapping("/{id}/edit")
    public void editTask(@PathVariable Long id, @RequestBody Task updatedTask) {
        taskService.editTask(id, updatedTask.getTitle());
    }

    @DeleteMapping("/{id}")
    public void deleteTask(@PathVariable Long id){
        taskService.deleteTask(id);
    }
}
