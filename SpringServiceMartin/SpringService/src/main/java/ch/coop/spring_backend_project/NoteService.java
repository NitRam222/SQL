package ch.coop.spring_backend_project;

import org.springframework.stereotype.Service;
import java.util.List;
import java.util.Optional;

@Service
public class NoteService {

    private final NoteRepository noteRepository;

    public NoteService(NoteRepository noteRepository) {
        this.noteRepository = noteRepository;
    }

    public List<Note> getAllNotes() {
        return (List<Note>) noteRepository.findAll();
    }

    public Optional<Note> getNoteById(Long id) {
        return noteRepository.findById(id);
    }

    public Note create(String content) {
        Note newNote = new Note();
        newNote.setContent(content);
        return noteRepository.save(newNote);
    }

    public boolean delete(Long id) {
        if (noteRepository.existsById(id)) {
            noteRepository.deleteById(id);
            return true;
        }
        return false;
    }

    public Optional<Note> update(Long id, String newContent) {
        return noteRepository.findById(id).map(existingNote -> {
            existingNote.setContent(newContent);
            return noteRepository.save(existingNote);
        });
    }
}
