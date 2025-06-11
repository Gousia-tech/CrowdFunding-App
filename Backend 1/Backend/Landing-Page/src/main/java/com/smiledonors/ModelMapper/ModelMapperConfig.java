package com.smiledonors.ModelMapper;

import com.smiledonors.DTO.OrphanageDTO;
import com.smiledonors.Model.OrphanageModel;
import org.modelmapper.ModelMapper;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import java.util.Base64;
import java.util.List;
import java.util.stream.Collectors;

@Configuration
public class ModelMapperConfig {

    @Bean
    public ModelMapper modelMapper() {
       ModelMapper mapper = new ModelMapper();
        // Custom mapping from byte[] to base64 string
//        mapper.typeMap(OrphanageModel.class, OrphanageDTO.class).addMappings(m -> {
//            m.map(src -> {
//                byte[] img = src.getImages();
//                return img != null ? Base64.getEncoder().encodeToString(img) : null;
//            }, OrphanageDTO::setImageBase64);
//        });
//        // Map List<byte[]> to List<String> (Base64) for DTO
//        mapper.typeMap(OrphanageImageModel.class, OrphanageImageDTO.class).addMappings(m -> {
//            m.map(src -> {
//                byte[] image = src.getImageData();
//                return image != null ? Base64.getEncoder().encodeToString(image) : null;
//            }, OrphanageImageDTO::setImageBase64);
//        });
//
//        // Map List<String> (Base64) to List<byte[]> for Model
//        mapper.typeMap(OrphanageDTO.class, OrphanageModel.class).addMappings(m -> {
//            m.map(dto -> {
//                List<String> imageBase64List = dto.getImageBase64List();
//                return imageBase64List != null
//                        ? imageBase64List.stream()
//                        .map(base64 -> Base64.getDecoder().decode(base64))
//                        .collect(Collectors.toList())
//                        : null;
//            }, OrphanageModel::setImages);
//        });

        return mapper;
    }


}
