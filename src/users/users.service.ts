import { Injectable, ConflictException, NotFoundException } from "@nestjs/common";

import { PrismaService } from "../prisma/prisma.service";

import { CreateUserDto } from "./dto/create-user.dto";

@Injectable()
export class UsersService {
    constructor(private prisma: PrismaService) {}

    async create(dto: CreateUserDto) {

        const existing = await this.prisma.user.findUnique({
            where: { email: dto.email}
        });
        if (existing) {
            throw new ConflictException("Email already exists");
        }
        return this.prisma.user.create({data: dto});
    }
    async findAll() {
        return this.prisma.user.findMany();
    }

    async findOne(id: number) {
        const user = await this.prisma.user.findUnique({ where: { id } });
        if (!user) {
            throw new NotFoundException("User not found");
        }
        return user;
    }
    async remove(id: number) {
        await this.findOne(id);
        return this.prisma.user.delete({ where: { id } });
    }
}