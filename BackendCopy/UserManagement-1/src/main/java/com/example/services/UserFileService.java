package com.example.services;

import java.io.File;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Paths;
import java.util.zip.ZipEntry;
import java.util.zip.ZipInputStream;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import com.example.model.UserRegister;
import com.example.repo.UserRepository;

@Service
public class UserFileService{
	@Autowired
    private final UserRepository userRepository;
    private final String uploadDir = "C:\\Users\\Admin\\OneDrive\\Desktop\\UserDetailsZipFileStored";

    public UserFileService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    public UserRegister registerUser(UserRegister user, MultipartFile zipFile) throws IOException {
        if (zipFile != null && !zipFile.isEmpty()) {
            String zipFilePath = saveZipFile(zipFile);
            user.setZipFilePath(zipFilePath);
        }
        return userRepository.save(user);
    }

    public String saveZipFile(MultipartFile file) throws IOException {
        if (!file.getOriginalFilename().endsWith(".zip")) {
            throw new IOException("Only ZIP files are allowed.");
        }

        File uploadFolder = new File(uploadDir);
        if (!uploadFolder.exists()) {
            uploadFolder.mkdirs();
        }

        String filePath = uploadDir + "\\" + file.getOriginalFilename();
        Files.write(Paths.get(filePath), file.getBytes());
        unzipFile(filePath, uploadDir + "\\unzipped\\");
        return filePath;
    }

    private void unzipFile(String zipFilePath, String destDir) throws IOException {
        File dir = new File(destDir);
        if (!dir.exists()) {
            dir.mkdirs();
        }
        try (ZipInputStream zis = new ZipInputStream(Files.newInputStream(Paths.get(zipFilePath)))) {
            ZipEntry entry;
            while ((entry = zis.getNextEntry()) != null) {
                File newFile = new File(destDir + entry.getName());
                Files.copy(zis, newFile.toPath());
            }
        }
    }
}