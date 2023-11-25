import { Injectable } from '@nestjs/common';
import { OkResDto, CreatePublicationReqDto } from 'src/dto';
import { PublicationRepository } from 'src/domain/repository';

@Injectable()
export class PublicationService {
  constructor(private publicationRepository: PublicationRepository) {}

  async createPublication(
    publications: CreatePublicationReqDto[],
    userId: number,
  ): Promise<OkResDto> {
    await Promise.all(
      publications.map(async (publication) => {
        const newPublication = this.publicationRepository.create(publication);
        newPublication.authorId = userId;
        await this.publicationRepository.save(newPublication);
      }),
    );
    return new OkResDto();
  }
}
