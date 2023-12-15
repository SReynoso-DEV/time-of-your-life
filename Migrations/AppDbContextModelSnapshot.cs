﻿// <auto-generated />
using System;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;
using time_of_your_life.Data;

#nullable disable

namespace time_of_your_life.Migrations
{
    [DbContext(typeof(AppDbContext))]
    partial class AppDbContextModelSnapshot : ModelSnapshot
    {
        protected override void BuildModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder.HasAnnotation("ProductVersion", "8.0.0");

            modelBuilder.Entity("time_of_your_life.Models.PresetEntity", b =>
                {
                    b.Property<Guid?>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("TEXT");

                    b.Property<bool>("BlinkColons")
                        .HasColumnType("INTEGER");

                    b.Property<string>("ClockFontColor")
                        .IsRequired()
                        .HasColumnType("TEXT");

                    b.Property<int>("ClockFontSize")
                        .HasColumnType("INTEGER");

                    b.Property<string>("FontColor")
                        .IsRequired()
                        .HasColumnType("TEXT");

                    b.Property<string>("FontFamily")
                        .IsRequired()
                        .HasColumnType("TEXT");

                    b.Property<string>("TimeZone")
                        .IsRequired()
                        .HasColumnType("TEXT");

                    b.Property<int>("TitleFontSize")
                        .HasColumnType("INTEGER");

                    b.Property<string>("TitleText")
                        .IsRequired()
                        .HasColumnType("TEXT");

                    b.HasKey("Id");

                    b.ToTable("Preset");
                });
#pragma warning restore 612, 618
        }
    }
}
