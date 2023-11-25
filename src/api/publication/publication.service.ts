import { BadRequestException, Injectable } from '@nestjs/common';
import {
  OkResDto,
  CreatePublicationReqDto,
  GetPublicationListResDto,
  GetPublicationDetailResDto,
} from 'src/dto';
import { PublicationRepository, UserRepository } from 'src/domain/repository';

@Injectable()
export class PublicationService {
  constructor(
    private publicationRepository: PublicationRepository,
    private userRepository: UserRepository,
  ) {}

  async createPublication(
    publication: CreatePublicationReqDto,
    userId: number,
  ): Promise<OkResDto> {
    const newPublication = this.publicationRepository.create(publication);
    newPublication.authorId = userId;
    await this.publicationRepository.save(newPublication);
    return new OkResDto();
  }

  async getPublication(
    publicationId: number,
  ): Promise<GetPublicationDetailResDto> {
    const publication = await this.publicationRepository
      .findOneByIdWithStudiesAndAuthor(publicationId)
      .catch(() => {
        throw new BadRequestException('해당하는 논문이 없습니다.');
      });
    return new GetPublicationDetailResDto(publication);
  }

  async getPublicationList(labId: number): Promise<GetPublicationListResDto[]> {
    const researchers = await this.userRepository.findByLabId(labId);
    return await Promise.all(
      researchers.map(async (researcher) => {
        const publications = await this.publicationRepository.findByAuthorId(
          researcher.id,
        );
        return new GetPublicationListResDto(publications, researcher);
      }),
    );
  }
}
