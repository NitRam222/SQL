package ch.coop.spring_backend_project;

import org.springframework.web.bind.annotation.*;
import java.util.*;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import java.util.List;

@RestController
@RequestMapping("/api/notes")

public class SpringServiceController {

    private final NoteService noteService;

    public SpringServiceController(NoteService noteService) {
        this.noteService = noteService;
    }

    @GetMapping("/{id}")
    public ResponseEntity<Note> getNoteById(@PathVariable Long id) {
        Optional<Note> note = noteService.getNoteById(id);
        return note.map(ResponseEntity::ok)
                .orElse(ResponseEntity.status(HttpStatus.NOT_FOUND).build());
    }

    @GetMapping("/")
    public List<Note> getAllNotes() {
        return noteService.getAllNotes();
    }

    @PostMapping("/create")
    public Note createNote(@RequestBody Note request) {
        return noteService.create(request.getContent());
    }

    @PutMapping("/{id}")
    public ResponseEntity<Note> updateNote(@PathVariable Long id, @RequestBody Note request) {
        Optional<Note> updatedNote = noteService.update(id, request.getContent());
        return updatedNote.map(ResponseEntity::ok)
                .orElse(ResponseEntity.status(HttpStatus.NOT_FOUND).build());
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteNoteById(@PathVariable Long id) {
        boolean deleted = noteService.delete(id);
        return deleted ? ResponseEntity.ok().build() : ResponseEntity.status(HttpStatus.NOT_FOUND).build();
    }
}